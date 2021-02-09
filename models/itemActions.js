const axios = require('axios')


const airtable = axios.create({
    baseURL: 'https://api.airtable.com/v0/appSm7uscErech1Zt',
    headers: {
        Authorization: 'Bearer keyHyLPdaCbr7AoxH'
    }
})


module.exports = {
    fetchMatches: (distributor, items ) => {
        let address = `/${distributor}?filterByFormula=OR(`
        items.forEach((item) => {
            address += (`{DISTB_ID}="${item}", `)
        })
        address = address.slice(0, -2)
        address += ")"
        return airtable.get(address)
    }
}