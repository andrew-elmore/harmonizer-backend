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
            if (distributor === 'MDF%20Main%20View'){
                items.forEach(({ distbId, upc, distb }) => {
                    if (upc != '' && distbId != undefined) {
                        address += `AND({DISTB}='${distb}%23', OR(FIND("${distbId}",{DISTB_ID}), {UPC}="${upc}")), `
                    } else if (upc === '') {
                        address += `AND({DISTB}="${distb}%23", FIND("${distbId}",{DISTB_ID})), `
                    } else {
                        address += `AND({DISTB}='${distb}%23',FIND("${upc}",{UPC})), `
                    }
                })
            } else {
                items.forEach(({ distbId, upc }) => {
                    if (upc != '' && distbId != undefined) {
                        address += `OR(FIND("${distbId}",{DISTB_ID}), {UPC}="${upc}"), `
                    } else if (upc === '') {
                        address += `FIND("${distbId}",{DISTB_ID}), `
                    } else {
                        address += `FIND("${upc}",{UPC}), `

                    }
                })
            }
            
            address = address.slice(0, -2)
            address += ")"
            console.log(address)
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

    