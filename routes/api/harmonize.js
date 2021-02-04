const express = require("express");
const router = express.Router();
const fs = require('fs')
const csvtojson = require('csvtojson')
const json2csv = require('json2csv').parse

const axios = require('axios')
const airtableKey = require('./../../config/keys')


const airtable = axios.create({
    baseURL: 'https://api.airtable.com/v0/appSm7uscErech1Zt',
    headers: {
        Authorization: 'Bearer keyHyLPdaCbr7AoxH'
    }
})


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



router.post('/match', (req, res) => {
    const distributors = JSON.parse(req.body.distributors)
    console.log(req.body.distributors)

    Object.entries(distributors).forEach(([distributor, items]) => {
        console.log("/match distributor: ", distributor); console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        console.log("/match items: ", items); console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        
    })
    res.send(req.body.distributors)
})

module.exports = router;