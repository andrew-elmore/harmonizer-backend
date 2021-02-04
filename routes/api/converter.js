const express = require("express");
const router = express.Router();
const fs = require('fs')
const csvtojson = require('csvtojson')
const json2csv = require('json2csv').parse
const axios = require('axios')
const airtableKey = require('./../../config/keys')

const airtable =  axios.create({
    baseURL: 'https://api.airtable.com/v0/appRq3KE6dmHiT6kf/conversion_key',
    headers: {
        Authorization: `Bearer ${airtableKey}`
    }
})





const convertRow = (data, idx, converterKeys) => {
    output = {}
    fields = Object.keys(data)
    let potentialToLog = []
    fields.forEach((feild) => {
        if (converterKeys[feild]){
            output[converterKeys[feild]] = data[feild]
        } else {
            if(idx === 0){
                potentialToLog.push(feild)
            }
            output[feild.replace(" ", "_").toUpperCase()] = data[feild]

        }
    })
    return output
}

const convert = async(source) => {
    let converterKeys = {}
    const res = await airtable.get('?maxRecords=100')
    res.data.records.forEach((record) => {
        oldFeild = record.fields.oldField;
        newFeild = record.fields.newFeild;
        converterKeys[oldFeild] = newFeild
    })
    result = []
    source.forEach((row, idx) => {
        result.push(convertRow(row, idx, converterKeys))
    })
    return result
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

        csvtojson().fromFile(destination).then(async(source) => {
            const result = await convert(source)
            const resultCSV = json2csv(result)
            fs.writeFileSync(destination, resultCSV)
            res.download(__dirname + `/../../public/${filename}.csv`, `${filename}.csv`)
            
            setTimeout(() => {
                fs.unlinkSync(destination)
            }, 10000)
        })


    });



    

})

module.exports = router;