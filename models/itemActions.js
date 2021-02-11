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
            let i = 0
            items.forEach((item) => {
                i ++
                address += `FIND("${item}",{DISTB_ID}), `
            })
            console.log("fetchMatches i: ", i); console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            
            address = address.slice(0, -2)
            address += ")"
            if (offset){
                return airtable.get(address, { params: { offset } })
            } else {
                return airtable.get(address)
            }
        } catch (err) {
            console.log('failed')
            console.log(err)
        }
    }
}

    