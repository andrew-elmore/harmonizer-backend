const express = require("express");
const router = express.Router();
const fs = require('fs')
const csvtojson = require('csvtojson')
const json2csv = require('json2csv').parse

const itemActions = require('./../../models/itemActions')





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
    console.log("mapAirtableResultsUpc airtableResults.length: ", airtableResults.length); console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");


    const records = airtableResults

    records.forEach((record) => {
        console.log("mapAirtableResultsUPC record: ", record); console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        
        const dbDistbId = record.fields['DISTB_ID']
        const tlId = record.fields['TL_ID']
        const labelType = record.fields['LABEL_TYPE']
        const dbProductName = record.fields['PRODUCT']
        const upc = record.fields['UPC']
        const productData = {
            ["ADDED_SUGAR+"]: record.field["ADDED_SUGAR+"],
            ["ALLERGEN_TL"]: record.field["ALLERGEN_TL"],
            ["ALLERGEN_VENDOR"]: record.field["ALLERGEN_VENDOR"],
            ["BRAND_NAME"]: record.field["BRAND_NAME"],
            ["CAL_FAT"]: record.field["CAL_FAT"],
            ["CALCIUM+"]: record.field["CALCIUM+"],
            ["CALORIES+"]: record.field["CALORIES+"],
            ["CHOLES+"]: record.field["CHOLES+"],
            ["Country"]: record.field["Country"],
            ["DAILY_CARB+"]: record.field["DAILY_CARB+"],
            ["DAILY_CHOLES+"]: record.field["DAILY_CHOLES+"],
            ["DAILY_FAT+"]: record.field["DAILY_FAT+"],
            ["DAILY_FIBER+"]: record.field["DAILY_FIBER+"],
            ["DAILY_SATFAT+"]: record.field["DAILY_SATFAT+"],
            ["DAILY_SOD+"]: record.field["DAILY_SOD+"],
            ["DAILY_SUGAR+"]: record.field["DAILY_SUGAR+"],
            ["DIET_FIBER+"]: record.field["DIET_FIBER+"],
            ["DISTB_BY"]: record.field["DISTB_BY"],
            ["Distb_Pro1"]: record.field["Distb_Pro1"],
            ["DISTBCODE"]: record.field["DISTBCODE"],
            ["FSIZE"]: record.field["FSIZE"],
            ["ING_ONLY"]: record.field["ING_ONLY"],
            ["INGREDIENT"]: record.field["INGREDIENT"],
            ["IRON+"]: record.field["IRON+"],
            ["LABEL_TYPE"]: record.field["LABEL_TYPE"],
            ["NGMO_CERT"]: record.field["NGMO_CERT"],
            ["OG NGMO Cert"]: record.field["OG NGMO Cert"],
            ["OG_CERT"]: record.field["OG_CERT"],
            ["POTASS+"]: record.field["POTASS+"],
            ["product line 1"]: record.field["product line 1"],
            ["product line 2"]: record.field["product line 2"],
            ["product line 3"]: record.field["product line 3"],
            ["PRODUCT_NA"]: record.field["PRODUCT_NA"],
            ["PROTEIN+"]: record.field["PROTEIN+"],
            ["SAT_FAT+"]: record.field["SAT_FAT+"],
            ["SELLING_PO"]: record.field["SELLING_PO"],
            ["SERV_SIZE+"]: record.field["SERV_SIZE+"],
            ["serving size 1+"]: record.field["serving size 1+"],
            ["serving size 2+"]: record.field["serving size 2+"],
            ["SODIUM+"]: record.field["SODIUM+"],
            ["TF_ITEM_"]: record.field["TF_ITEM_"],
            ["TOTAL_CARB+"]: record.field["TOTAL_CARB+"],
            ["TOTAL_FAT+"]: record.field["TOTAL_FAT+"],
            ["TOTAL_SUGAR+"]: record.field["TOTAL_SUGAR+"],
            ["TRANS_FAT+"]: record.field["TRANS_FAT+"],
            ["VIT_D+"]: record.field["VIT_D+"],
            ["VITAMIN_A"]: record.field["VITAMIN_A"],
            ["VITAMIN_C"]: record.field["VITAMIN_C"],
        }
        if (matches[distb]) {
            matches[distb][upc] = { tlId, dbProductName, labelType, dbDistbId, productData}
        } else {
            matches[distb] = {}
            matches[distb][upc] = { tlId, dbProductName, labelType, dbDistbId, productData }
        }
    })
}

const mapAirtableResultsDistbId = (matches, airtableResults, distb) => {
    // console.log("mapAirtableResultsDistbId airtableResults.length: ", airtableResults.length); console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    

    const records = airtableResults

    records.forEach((record) => {
        const distbId = record.fields['DISTB_ID']
        const tlId = record.fields['TL_ID']
        const labelType = record.fields['LABEL_TYPE']
        const dbProductName = record.fields['PRODUCT']
        const upc = record.fields['UPC']
        const productData = {
            ["ADDED_SUGAR+"]: record.fields["ADDED_SUGAR+"],
            ["ALLERGEN_TL"]: record.fields["ALLERGEN_TL"],
            ["ALLERGEN_VENDOR"]: record.fields["ALLERGEN_VENDOR"],
            ["BRAND_NAME"]: record.fields["BRAND_NAME"],
            ["CAL_FAT"]: record.fields["CAL_FAT"],
            ["CALCIUM+"]: record.fields["CALCIUM+"],
            ["CALORIES+"]: record.fields["CALORIES+"],
            ["CHOLES+"]: record.fields["CHOLES+"],
            ["Country"]: record.fields["Country"],
            ["DAILY_CARB+"]: record.fields["DAILY_CARB+"],
            ["DAILY_CHOLES+"]: record.fields["DAILY_CHOLES+"],
            ["DAILY_FAT+"]: record.fields["DAILY_FAT+"],
            ["DAILY_FIBER+"]: record.fields["DAILY_FIBER+"],
            ["DAILY_SATFAT+"]: record.fields["DAILY_SATFAT+"],
            ["DAILY_SOD+"]: record.fields["DAILY_SOD+"],
            ["DAILY_SUGAR+"]: record.fields["DAILY_SUGAR+"],
            ["DIET_FIBER+"]: record.fields["DIET_FIBER+"],
            ["DISTB_BY"]: record.fields["DISTB_BY"],
            ["Distb_Pro1"]: record.fields["Distb_Pro1"],
            ["DISTBCODE"]: record.fields["DISTBCODE"],
            ["FSIZE"]: record.fields["FSIZE"],
            ["ING_ONLY"]: record.fields["ING_ONLY"],
            ["INGREDIENT"]: record.fields["INGREDIENT"],
            ["IRON+"]: record.fields["IRON+"],
            ["LABEL_TYPE"]: record.fields["LABEL_TYPE"],
            ["NGMO_CERT"]: record.fields["NGMO_CERT"],
            ["OG NGMO Cert"]: record.field["OG sNGMO Cert"],
            ["OG_CERT"]: record.fields["OG_CERT"],
            ["POTASS+"]: record.fields["POTASS+"],
            ["product line 1"]: record.field["product sline 1"],
            ["product line 2"]: record.field["product sline 2"],
            ["product line 3"]: record.field["product sline 3"],
            ["PRODUCT_NA"]: record.fields["PRODUCT_NA"],
            ["PROTEIN+"]: record.fields["PROTEIN+"],
            ["SAT_FAT+"]: record.fields["SAT_FAT+"],
            ["SELLING_PO"]: record.fields["SELLING_PO"],
            ["SERV_SIZE+"]: record.fields["SERV_SIZE+"],
            ["serving size 1+"]: record.field["serving ssize 1+"],
            ["serving size 2+"]: record.field["serving ssize 2+"],
            ["SODIUM+"]: record.fields["SODIUM+"],
            ["TF_ITEM_"]: record.fields["TF_ITEM_"],
            ["TOTAL_CARB+"]: record.fields["TOTAL_CARB+"],
            ["TOTAL_FAT+"]: record.fields["TOTAL_FAT+"],
            ["TOTAL_SUGAR+"]: record.fields["TOTAL_SUGAR+"],
            ["TRANS_FAT+"]: record.fields["TRANS_FAT+"],
            ["VIT_D+"]: record.fields["VIT_D+"],
            ["VITAMIN_A"]: record.fields["VITAMIN_A"],
            ["VITAMIN_C"]: record.fields["VITAMIN_C"],  
        }
        if (matches[distb]) {
            matches[distb][distbId] = { tlId, dbProductName, labelType, upc, productData}
        } else {
            matches[distb] = {}
            matches[distb][distbId] = { tlId, dbProductName, labelType, upc, productData}
        }
    })
}

router.post('/match', async(req, res) => {
    console.log(req.body.indexingIdType)
    const indexingIdType = JSON.parse(req.body.indexingIdType)
    const distbs = JSON.parse(req.body.distbs)
    let matches = {}
    let distbsArray = Object.entries(distbs)
    
    for (const [distb, items] of distbsArray) {
        try{
            const airtableResults = await recursiveFetchMatches(distb, items, null)
            console.log(indexingIdType === 'distbId')
            if (indexingIdType === 'distbId'){
                mapAirtableResultsDistbId(matches, airtableResults, distb)
            } else {
                mapAirtableResultsUpc(matches, airtableResults, distb)
            }
        } catch (err){
            console.log(err)
        }
    }
    console.log(matches)
    res.send(matches)
})


router.post('/download', async(req, res) => {
    const matchedData = JSON.parse(req.body.matchedData)
    let csvData = matchedData.map((row) => {
        return({
            ["TL_ID"]: row.tlId,
            ["DISTB_ID"]: row.distbId,
            ["DISTB"]: row.distb,
            ["LABEL_TYPE"]: row.labelType,
            ["PRODUCT"]: row.dbProductName,
            ["UPC"]: row.upc,
            ['file product name']: row.product,
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