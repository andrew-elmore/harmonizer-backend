import React from 'react';

import download from 'downloadjs'

import Mapping from './mapping/mapping'
import Matched from './matching/matched'
import Unmatched from './matching/unmatched'
import Approval from './approval/approval'
import { uploadStyle, tLBlue} from './styles'

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.separateMdfFields = ['UNFI', 'UNFIW', 'KEHE', 'FTC', 'GBF']
        this.state = {
            rawData: [
                // {'ID': '152090', 'price': '1.56', 'plu': '7735', 'distb': 'UNFI', 'brand': 'bionaturae®', 'product': 'Extra Virgin Olive Oil', 'upc': '2250642350'}, 
                // {'ID': '486597', 'price': '7.4', 'plu': '6501', 'distb': 'UNFI', 'brand': "Jimbo's Jumbos", 'product': 'Blanched Peanuts (Oil Roasted, Unsalted)', 'upc': '7418301065'}, 
                // {'ID': '1169580', 'price': '6.66', 'plu': '762', 'distb': 'UNFI', 'brand': 'Napa Valley Naturals®', 'product': 'Safflower Oil', 'upc': '7869691002'}, 
                // {'ID': '393850', 'price': '6.95', 'plu': '242', 'distb': 'UNFI', 'brand': 'Spectrum Naturals', 'product': 'All Vegetable Shortening', 'upc': '22506002708'}, 
                // {'ID': '857649', 'price': '7.75', 'plu': '881', 'distb': 'UNFI', 'brand': 'Spectrum Naturals', 'product': 'High Heat Safflower Oil (Refined)', 'upc': '22506101401'}, 
                // {'ID': '504415', 'price': '4.18', 'plu': '8214', 'distb': 'UNFI', 'brand': 'Spectrum Naturals', 'product': 'High Heat Safflower Oil (Refined)', 'upc': '22506101401'}, 
                // {'ID': '932269', 'price': '4.01', 'plu': '5824', 'distb': 'UNFI', 'brand': 'Spectrum Naturals', 'product': 'Safflower Oil (Unrefined)', 'upc': '22506101500'}, 
                // {'ID': '504472', 'price': '2.16', 'plu': '6547', 'distb': 'UNFI', 'brand': 'Spectrum Naturals', 'product': 'Sunflower Oil (Refined)', 'upc': '22506117501'}, 
                // {'ID': '226746', 'price': '0.49', 'plu': '8766', 'distb': 'UNFI', 'brand': 'Spectrum Naturals', 'product': 'Canola Oil (Refined)', 'upc': '22506134300'}, 
                // {'ID': '961300', 'price': '4.05', 'plu': '2193', 'distb': 'UNFI', 'brand': 'Spectrum Naturals', 'product': 'Canola Oil (Refined)', 'upc': '22506134409'}, 
                // {'ID': '508044', 'price': '9.59', 'plu': '2852', 'distb': 'UNFI', 'brand': 'Spectrum Naturals', 'product': 'Canola Oil (Refined)', 'upc': '22506138308'}, 
                // {'ID': '641845', 'price': '6.58', 'plu': '7002', 'distb': 'UNFI', 'brand': 'Spectrum Naturals', 'product': 'Canola Oil (Refined)', 'upc': '22506138308'}, 
                // {'ID': '402941', 'price': '8.85', 'plu': '4262', 'distb': 'UNFI', 'brand': 'Spectrum Naturals', 'product': 'Toasted Sesame Oil (Unrefined)', 'upc': '22506165106'}, 
                // {'ID': '326488', 'price': '8.12', 'plu': '4138', 'distb': 'UNFI', 'brand': 'Spectrum Naturals', 'product': 'Red Wine Vinegar', 'upc': '22506260283'}, 
                // {'ID': '326587', 'price': '3.97', 'plu': '6716', 'distb': 'UNFI', 'brand': 'Spectrum Naturals', 'product': 'White Wine Vinegar', 'upc': '22506261280'}, 
                // {'ID': '857482', 'price': '9.3', 'plu': '7050', 'distb': 'UNFI', 'brand': 'Spectrum Naturals', 'product': 'Balsamic Vinegar', 'upc': '22506262287'}, 
                // {'ID': '326462', 'price': '0.33', 'plu': '3612', 'distb': 'UNFI', 'brand': 'Spectrum Naturals', 'product': 'Apple Cider Vinegar (Unfiltered)', 'upc': '22506270282'}, 
                // {'ID': '300699', 'price': '4.2', 'plu': '8078', 'distb': 'UNFI', 'brand': 'Spectrum Naturals', 'product': 'Apple Cider Vinegar (Filtered)', 'upc': '22506281288'}, 
                // {'ID': '960898', 'price': '0.3', 'plu': '5070', 'distb': 'UNFI', 'brand': 'Spectrum Naturals', 'product': 'Extra Virgin Olive Oil', 'upc': '22506423305'}, 
                // {'ID': '701607', 'price': '9.48', 'plu': '3886', 'distb': 'UNFI', 'brand': 'Spectrum Naturals', 'product': 'Extra Virgin Olive Oil', 'upc': '22506423459'}, 
            ],
            mappedData: [
 
            ],
            matchedData: [
                // { tlId: "10025", distb: "UNFI", labelType: 'OG+', distbId: "475517", product: "Mind, Body and Soul", dbProductName: "Mind, Body and Soul"},
                // { tlId: "10025", distb: "UNFI", labelType: 'OG+', distbId: "303537", product: "Mind, Body and Soul", dbProductName: "Mind, Body and Soul"},
                // { tlId: "10087", distb: "UNFI", labelType: 'OG+', distbId: "457481", product: "Earl Grey Black Tea", dbProductName: "Earl Grey Black Tea"},
                // { tlId: "10088", distb: "UNFI", labelType: 'OG+', distbId: "684514", product: "Fair Trade English Breakfast Tea", dbProductName: "Fair Trade English Breakfast Tea"},
                // { tlId: "10134", distb: "UNFI", labelType: 'OG+', distbId: "736488", product: "Gunpowder Green Tea (Special Pin Head)", dbProductName: "Gunpowder Green Tea (Special Pin Head)"},
                // { tlId: "10174", distb: "UNFI", labelType: 'OG+', distbId: "272310", product: "Biodynamic", dbProductName: "Biodynamic"},
                // { tlId: "10176", distb: "UNFI", labelType: 'OG+', distbId: "987420", product: "Breakfast Blend", dbProductName: "Breakfast Blend"},
                // { tlId: "10177", distb: "UNFI", labelType: 'OG+', distbId: "992883", product: "Colombian", dbProductName: "Colombian"},
                // { tlId: "12685", distb: "KEHE", labelType: 'OG+', distbId: "1628429", product: "White Rice Flour", dbProductName: "White Rice Flour"},
                // { tlId: "11647", distb: "KEHE", labelType: 'OG+', distbId: "64834", product: "Cornstarch", dbProductName: "Cornstarch"},
                // { tlId: "12267", distb: "KEHE", labelType: 'OG+', distbId: "340257", product: "Whole Wheat Flour", dbProductName: "Whole Wheat Flour"},
                // { tlId: "10680", distb: "KEHE", labelType: 'OG+', distbId: "113858", product: "Guatemalan Atitlan", dbProductName: "Guatemalan Atitlan"},
                // { tlId: "12682", distb: "KEHE", labelType: 'OG+', distbId: "331150", product: "Brown Rice Flour", dbProductName: "Brown Rice Flour"},
            ],
            unmatchedData: [
                // { distb: "KEHE", distbId: "10438", product: "Vital Wheat Gluten"}

            ],
            fileName: '',
            indexingIdType: 'distbId',
        };

    

        this.url = 'http://localhost:5000'
        this.name = 'res'
        this.handleUpload = this.handleUpload.bind(this);
        this.submitMapping = this.submitMapping.bind(this);
        this.fetchMatches = this.fetchMatches.bind(this);
        this.createCsv = this.createCsv.bind(this)
        this.reject = this.reject.bind(this)
        this.setIndexingIdType = this.setIndexingIdType.bind(this)
        this.notInDatabase = this.notInDatabase.bind(this)
    }

    //Upload
    handleUpload(ev) {
        try{

            ev.preventDefault();
            this.name = this.uploadInput.files[0].name
            const data = new FormData();
            data.append('file', this.uploadInput.files[0]);
            data.append('filename', 'convert');
    
            // fetch(`${this.url}/api/harmonize/upload`, {
            fetch(`/api/harmonize/upload`, {
                method: 'POST',
                body: data,
            }).then(response => response.json())
                .then((data) => {
                    this.setState({ ['rawData']: data })
                });
        } catch (err){
            console.log(err)
        }
    }

    //Mapping
    setIndexingIdType(type) {
        this.setState({ ['indexingIdType']: type})
    }

    submitMapping(mappedFieldNames) {
                
        const rawData = this.state.rawData
        let mappedData = rawData.map((row) => {
            let nums = '1234567890'
            let distbId
            if (row[mappedFieldNames['distibId']]) {
                distbId = row[mappedFieldNames['distibId']].split('').filter((char) => { return nums.includes(char) }).join('')
            }
            let mappedRow = {}
            Object.entries(mappedFieldNames).forEach(([fieldName, rowName]) => {
                mappedRow[fieldName] = row[rowName]
            })
            return mappedRow
        });

        mappedData = mappedData.filter((row) => { return (row[this.state.indexingIdType].length != 0) })
        this.setState({
            ["rawData"]: [],
            ["mappedData"]: mappedData,
        })
        this.fetchMatches(mappedData)

    }

    //Matching
    fetchMatches(sourceData) {
        
        const distbs = {}
        sourceData.forEach((row) => {
            if (this.separateMdfFields.includes(row["distb"])){
                if (distbs[row["distb"]]) {
                    distbs[row["distb"]].push({distbId: row["distbId"], upc: row['upc']})
                } else {
                    distbs[row["distb"]] = [{ distbId: row["distbId"], upc: row['upc'] }]
                }
            } else {
                if (distbs['MDF%20Main%20View']){
                    distbs['MDF%20Main%20View'].push({ distbId: row["distbId"], upc: row['upc'], distb: row['distb']})
                } else{
                    distbs['MDF%20Main%20View'] = [{ distbId: row["distbId"], upc: row['upc'], distb: row['distb'] }]
                }
            }
        })
        const formData = new FormData();
        formData.append('distbs', JSON.stringify(distbs));
        formData.append('indexingIdType', JSON.stringify(this.state.indexingIdType));

        // fetch(`${this.url}/api/harmonize/match`, {
        fetch(`/api/harmonize/match`, {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then((matches) => {                        
            console.log(matches.length)
            this.mapMatches(matches, sourceData)
        });
    }

    mapMatches(matches, sourceData) {

        if (this.state.indexingIdType === 'upc') {
            this.mapUpcMatches(matches, sourceData)
        } else if (this.state.indexingIdType === 'distbId') {
            this.mapDistbIdMatches(matches, sourceData)
        }
    }

    mapUpcMatches(matches, sourceData) {
        const matchedData = this.state.matchedData
        let unmatchedData = this.state.unmatchedData



        sourceData.forEach((row) => {
            try {
                if(row.upc.length < 10){throw'too few chars'}
                let matchedItems = []
                Object.entries(matches[row.distb]).forEach(([dbUpc, dbItem]) => {
                    if (dbUpc.includes(row.upc)) {
                        matchedItems.push({ ...dbItem, dbUpc })
                    }
                })

                let matchedItem = null
                if (matchedItems.length === 1) {
                    matchedItem = matchedItems[0]


                } else {
                    let exactMatches = matchedItems.filter((item) => { return row.upc === item.dbUpc })
                    if (exactMatches.length === 1) {
                        matchedItem = matchedItems[0]
                    } else {
                        if (unmatchedData.filter((item) => { return (item.product === row.product) }).length === 0) {
                            unmatchedData.push({ ...row, potentialMatches: matchedItems })
                        }
                        throw 'not Found';
                    }
                }

                matchedData.unshift({
                    ...row,
                    ['labelType']: matchedItem.labelType,
                    ["tlId"]: matchedItem.tlId,
                    ["dbProductName"]: matchedItem.dbProductName,
                    ["distbId"]: matchedItem.dbDistbId,
                    ["dbUpc"]: matchedItem.dbUpc,
                    ['productData']: matchedItem.productData

                })
                unmatchedData = unmatchedData.filter((item) => { return item.product != row.product })
            } catch (err) {
                unmatchedData.push({ ...row, potentialMatches: [] })
                console.log(err)
            }
        });



        this.setState({
            ["matchedData"]: matchedData,
            ["unmatchedData"]: unmatchedData,
            ['mappedData']: []
        })
    }

    mapDistbIdMatches(matches, sourceData) {
        const matchedData = this.state.matchedData
        let unmatchedData = this.state.unmatchedData


        
        sourceData.forEach((row) => {
            try {
                let matchedItems = []
                Object.entries(matches[row.distb]).forEach(([dbDistbId, dbItem]) => {
                    if (dbDistbId.includes(row.distbId)) {
                        matchedItems.push({ ...dbItem, dbDistbId })
                    }
                })
                let matchedItem = null
                if (matchedItems.length === 1) {
                    matchedItem = matchedItems[0]


                } else {
                    let exactMatches = matchedItems.filter((item) => { return row.distbId === item.dbDistbId })
                    if (exactMatches.length === 1) {
                        matchedItem = matchedItems[0]
                    } else {
                        if (unmatchedData.filter((item) => { return (item.product === row.product) }).length === 0) {
                            unmatchedData.push({ ...row, potentialMatches: matchedItems })
                        } else {
                            throw 'not Found';
                        }
                    }
                }

                
                if (matchedItem){
                    matchedData.unshift({
                        ...row,
                        ['labelType']: matchedItem.labelType,
                        ["tlId"]: matchedItem.tlId,
                        ["dbProductName"]: matchedItem.dbProductName,
                        ["distbId"]: matchedItem.dbDistbId,
                        ["dbUpc"]: matchedItem.dbUpc,
                        ['productData']: matchedItem.productData
                    })
                    unmatchedData = unmatchedData.filter((item) => { return item.product != row.product })
                }
            } catch (err) {
                unmatchedData.push({ ...row, potentialMatches: [] })
                console.log(err)
            }
        });

        
        this.setState({
            ["matchedData"]: matchedData,
            ["unmatchedData"]: unmatchedData,
            ['mappedData']: []
        })
    }


    notInDatabase(item, idx) {
        debugger
        const matchedData = this.state.matchedData
        let unmatchedData = this.state.unmatchedData
        matchedData.unshift({
            ...item,
            ['labelType']: '',
            ["tlId"]: '',
            ["dbProductName"]: '',
            ["distbId"]: item.distbId,
            ["dbUpc"]: item.upc,
            ['productData']: { ['BRAND']: item.brand, ['PRODUCT']: item.product, }
        })
        unmatchedData.splice(idx, 1)
        this.setState({
            ["matchedData"]: matchedData,
            ["unmatchedData"]: unmatchedData
        })
    }
    //Matches
    reject(idx) {
        let matchedData = this.state.matchedData
        let unmatchedData = this.state.unmatchedData
        let itemToUnmatch = matchedData[idx]
        unmatchedData.push({...itemToUnmatch, ['potentialMatches']: []})
        matchedData = matchedData.filter((row, i) => { return i != idx })
        this.setState({
            ['matchedData']: matchedData,
            ['unmatchedData']: unmatchedData
        })
    }

    //Download
    createCsv(fileName) {
        const formData = new FormData();
        formData.append('matchedData', JSON.stringify(this.state.matchedData));

        // fetch(`${this.url}/api/harmonize/download`, {
        fetch(`/api/harmonize/download`, {
            method: 'POST',
            body: formData,
        })
            .then((response) => {
                this.downloadFile(response, fileName)
            });
    }

    downloadFile = async (res, fileName) => {
        const blob = await res.blob();
        download(blob, fileName);
    }

    render() {
        const selectedIndexTypeButton = () => {
            let selected = { backgroundColor: tLBlue, color: 'white' }
            let upcStyle = this.state.indexingIdType === 'upc' ? { ...uploadStyle.upcIndexButton, ...selected } : { ...uploadStyle.upcIndexButton }
            let distbIdStyle = this.state.indexingIdType === 'distbId' ? { ...uploadStyle.distbIdIndexButton, ...selected } : { ...uploadStyle.distbIdIndexButton }

            return (
                <button
                    style={uploadStyle.indexButton}
                    onClick={() => {
                        if (this.state.indexingIdType === 'upc') {
                            this.setIndexingIdType('distbId')
                        } else {
                            this.setIndexingIdType('upc')
                        }
                    }}
                >
                    <div
                        style={distbIdStyle}
                    >DISTB_ID</div>
                    <div
                        style={upcStyle}
                    >UPC</div>
                </button>
            )
        }
        return (
            <div>
                {/* <button onClick={() => { console.log(this.state) }}>See State</button> */}
                <form 
                    onSubmit={this.handleUpload}>
                    <div style={uploadStyle.container}>
                        <input 
                            style={{ ...uploadStyle.button, marginRight: 30 }}
                            ref={(ref) => { this.uploadInput = ref; }} type="file" 
                        />
                        <button 
                            style={{ ...uploadStyle.button}}
                        >Upload</button>
                    </div>
                </form>
                {selectedIndexTypeButton()}
                <Mapping
                    rawData={this.state.rawData}
                    submitMapping={(distbName, distbIdName, productName, upcName) => { this.submitMapping(distbName, distbIdName, productName, upcName)}}
                    setIndexingIdType={(type) => { this.setIndexingIdType(type) }}
                    indexingIdType={this.state.indexingIdType}
                />
                <Approval
                    createCsv={(fileName) => { this.createCsv(fileName) }}
                    incompleteData={(this.state.unmatchedData.length + this.state.mappedData.length + this.state.rawData.length)}
                    completeData={this.state.matchedData.length}
                />
                <Unmatched
                    unmatchedData={this.state.unmatchedData}
                    fetchMatches={(item) => {this.fetchMatches(item)}}
                    notInDatabase={(item, idx) => { this.notInDatabase(item, idx)}}
                />
                <Matched
                    matchedData={this.state.matchedData}
                    reject={(idx) => { this.reject(idx)}}
                />
                <Approval
                    createCsv={(fileName) => { this.createCsv(fileName) }}
                    incompleteData={(this.state.unmatchedData.length + this.state.mappedData.length + this.state.rawData.length )}
                    completeData={this.state.matchedData.length}
                />

            </div>
        );
    }
}

export default Main;




