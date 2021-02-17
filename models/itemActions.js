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
            items.forEach(({distbId, upc}) => {
                i ++
                console.log("fetchMatches distbId: ", distbId); console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                console.log("fetchMatches upc: ", upc); console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                
                if (upc != '' && distbId != undefined){
                    address += `OR(FIND("${distbId}",{DISTB_ID}), {UPC}="${upc}"), `
                } else if(upc === ''){
                    address += `FIND("${distbId}",{DISTB_ID}), `
                } else {
                    address += `FIND("${upc}",{UPC}), `

                }
            })
            
            address = address.slice(0, -2)
            address += ")"
            if (offset){
                return airtable.get(address, { params: { offset } })
            } else {
                return airtable.get(address)
            }
        } catch (err) {
            console.log(err)
        }
    }
}

    