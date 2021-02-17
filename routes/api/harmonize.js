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
        const dbDistbId = record.fields['DISTB_ID']
        const tlId = record.fields['TL_ID']
        const labelType = record.fields['LABEL_TYPE']
        const dbProductName = record.fields['PRODUCT']
        const upc = record.fields['UPC']
        if (matches[distb]) {
            matches[distb][upc] = { tlId, dbProductName, labelType, dbDistbId }
        } else {
            matches[distb] = {}
            matches[distb][upc] = { tlId, dbProductName, labelType, dbDistbId }
        }
    })
}

const mapAirtableResultsDistbId = (matches, airtableResults, distb) => {
    console.log("mapAirtableResultsDistbId airtableResults.length: ", airtableResults.length); console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    

    const records = airtableResults

    records.forEach((record) => {
        const distbId = record.fields['DISTB_ID']
        const tlId = record.fields['TL_ID']
        const labelType = record.fields['LABEL_TYPE']
        const dbProductName = record.fields['PRODUCT']
        const upc = record.fields['UPC']
        if (matches[distb]) {
            matches[distb][distbId] = { tlId, dbProductName, labelType, upc}
        } else {
            matches[distb] = {}
            matches[distb][distbId] = { tlId, dbProductName, labelType, upc}
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