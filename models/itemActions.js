const axios = require('axios')


const airtable = axios.create({
    baseURL: 'https://api.airtable.com/v0/appSm7uscErech1Zt',
    headers: {
        Authorization: 'Bearer keyHyLPdaCbr7AoxH'
    }
})


module.exports = {
    fetchMatches: (distributor, items , offset) => {
        try{
            let address = `/${distributor}?filterByFormula=OR(`
            items.forEach((item) => {
                address += `FIND("${item}",{DISTB_ID}), `
            })
            address = address.slice(0, -2)
            address += ")"
            return airtable.get(address)
        } catch (err) {
            console.log('failed')
            console.log(err)
        }
    }
}

    