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



router.post('/match', async(req, res) => {
    console.log(req.body.distbs)
    const distbs = JSON.parse(req.body.distbs)

    let matches = {}
    let distbsArray = Object.entries(distbs)
    for (const [distb, items] of distbsArray) {
        const airtableResults = await itemActions.fetchMatches(distb, items)
        const records = airtableResults.data.records

        records.forEach((record) => {
            const distbId = record.fields['DISTB_ID']
            const tlId = record.fields['TL_ID']
            if(matches[distb]){
                matches[distb][distbId] = tlId
            } else {
                matches[distb] = {}
                matches[distb][distbId] = tlId
            }
        })
    }

    console.log(matches)
    res.send(matches)
})

module.exports = router;