const express = require("express");
const router = express.Router();
const fs = require('fs')
const csvtojson = require('csvtojson')
const json2csv = require('json2csv').parse

const itemActions = require('./../../models/itemActions')


const createProductData = (fields) => {
    const productDataFields = [
        'ADDED_SUGAR',
        'ALLERGEN_TL',
        'ALLERGEN_VENDOR',
        'BRAND',
        'CAL_FAT',
        'CALCIUM',
        'CALORIES',
        'CHOLEST_MG',
        'COUNTRY',
        'DV_CARB',
        'DV_CHOLEST',
        'DV_FAT',
        'DV_FIBER',
        'DV_SAT_FAT',
        'DV_SODIUM',
        'DV_SUGAR',
        'FIBER',
        'SUPPLIER',
        'DISTB_ID',
        'DISTB',
        'FSIZE',
        'ING_ONLY',
        'INGREDIENTS',
        'IRON',
        'LABEL_TYPE',
        'NGMO_CERT',
        'OG NGMO Cert',
        'OG_CERT',
        'PLU_NMR',
        'POTASS',
        'PRODUCT_LINE_1',
        'PRODUCT_LINE_2',
        'PRODUCT_LINE_3',
        'PRODUCT',
        'PROTEIN',
        'SAT_FAT',
        'DETAILS',
        'SERV_SIZE',
        'SERV_SIZE_1',
        'SERV_SIZE_2',
        'SODIUM_MG',
        'TL_ID',
        'TOTAL_CARB',
        'TOTAL_FAT',
        'TOTAL_SUGAR',
        'TRANS_FAT',
        'VIT_D',
        'DV_VIT_A',
        'DV_VIT_C',
    ]

    const productData = {}
    
    productDataFields.forEach((productDataField) => {
        productData[productDataField] = fields[productDataField]
    })

    return productData

}



router.post('/upload', (req, res, next) => {
    let file = req.files.file;

    let filename = file.name.slice(0, file.name.lastIndexOf('.'))
    let destination = `${__dirname}/../../public/${filename}.csv`
    file.mv(destination, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send(err);
        }

        csvtojson().fromFile(destination).then(async (source) => {
            console.log(Object.keys(source).length)
            res.send(source)
            
            setTimeout(() => {
                try {
                    fs.unlinkSync(destination)
                } catch (error) {
                    console.log(error)
                }
            }, 10000)
        })
    });
})

const recursiveFetchMatches = async(distb, items, offset) => {
    
    const airtableResults = await itemActions.fetchMatches(distb, items, offset)
    
    if (!airtableResults.data.offset) {
        return airtableResults.data.records
    } else {
        const nextPage = await recursiveFetchMatches(distb, items, airtableResults.data.offset)
        return [...airtableResults.data.records, ...nextPage]
    }
}


const mapAirtableResultsUpc = (matches, airtableResults, distb) => {


    const records = airtableResults

    records.forEach((record) => {
        
        const dbDistbId = record.fields['DISTB_ID']
        const tlId = record.fields['TL_ID']
        const labelType = record.fields['LABEL_TYPE']
        const dbProductName = record.fields['PRODUCT']
        const upc = record.fields['UPC']
        const productData = createProductData(record.fields)

        if (matches[distb]) {
            matches[distb][upc] = { tlId, dbProductName, labelType, dbDistbId, productData}
        } else {
            matches[distb] = {}
            matches[distb][upc] = { tlId, dbProductName, labelType, dbDistbId, productData }
        }
    })
}

const mapAirtableResultsDistbId = (matches, airtableResults, distb) => {
    

    const records = airtableResults

    records.forEach((record) => {
        
        const distbId = record.fields['DISTB_ID']
        const tlId = record.fields['TL_ID']
        const labelType = record.fields['LABEL_TYPE']
        const dbProductName = record.fields['PRODUCT']
        const upc = record.fields['UPC']
        const productData = createProductData(record.fields)

        if (matches[distb]) {
            matches[distb][distbId] = { tlId, dbProductName, labelType, upc, productData}
        } else {
            matches[distb] = {}
            matches[distb][distbId] = { tlId, dbProductName, labelType, upc, productData}
        }
    })
}

router.post('/match', async(req, res) => {
    
    const indexingIdType = JSON.parse(req.body.indexingIdType)
    const distbs = JSON.parse(req.body.distbs)
    console.log(typeof distbs)
    let matches = {}
    let distbsArray = Object.entries(distbs)
    
    for (const [distb, items] of distbsArray) {
        try{
            const airtableResults = await recursiveFetchMatches(distb, items, null)
            if (indexingIdType === 'distbId'){
                mapAirtableResultsDistbId(matches, airtableResults, distb)
            } else {
                mapAirtableResultsUpc(matches, airtableResults, distb)
            }
        } catch (err){
            console.log(err.response.status)
        }
    }
    if (matches['MDF%20Main%20View']){
        const unsortedMdfMainViewMatches = Object.entries(matches['MDF%20Main%20View'])
        unsortedMdfMainViewMatches.forEach(([id, item]) => {
            distb = item.productData['DISTB'].replace('#', '')
            if (matches[distb]){
                matches[distb][id] = item
            } else {
                matches[distb] = {[id]: item}
            }
        })
        delete matches['MDF%20Main%20View']
    }
    res.send(matches)
})


router.post('/download', async(req, res) => {
    const matchedData = JSON.parse(req.body.matchedData)
    let csvData = matchedData.map((row) => {
        const productData = row.productData        
        return({
            ["TL_ID"]: row.tlId,
            ["DISTB_ID"]: row.distbId,
            ["DISTB"]: row.distb,
            ["LABEL_TYPE"]: row.labelType,
            ["BRAND"]: row.productData["BRAND"],
            ["PRODUCT"]: row.dbProductName,
            ["UPC"]: row.upc,
            ["PRICE"]: row.price,
            ["PLU"]: row.plu,
            ['file product name']: row.product,

            ...productData
        })
    })


    
    let filename = 'result'

    let destination = __dirname + `/../../public/${filename}.csv`
    const resultCSV = json2csv(csvData)
    fs.writeFileSync(destination, resultCSV)
    res.download(__dirname + `/../../public/${filename}.csv`, `${filename}.csv`)

    setTimeout(() => {
        try {
            fs.unlinkSync(destination)
        } catch (error) {
            console.log(error)
        }
    }, 10000)

})

module.exports = router;

