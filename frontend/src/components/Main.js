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

        this.state = {
            rawData: [
                { "ID": '475517', "Supplier": 'UNFI', "name": 'Mind, Body and Soul' },
                { "ID": '303537', "Supplier": 'UNFI', "name": 'Mind, Body and Soul' },
                { "ID": '457481', "Supplier": 'UNFI', "name": 'Earl Grey Black Tea' },
                { "ID": '684514', "Supplier": 'UNFI', "name": 'Fair Trade English Breakfast Tea' },
                { "ID": '736488', "Supplier": 'UNFI', "name": 'Gunpowder Green Tea (Special Pin Head)' },
                { "ID": '0272310', "Supplier": 'UNFI', "name": 'Biodynamic' },
                { "ID": '987420', "Supplier": 'UNFI', "name": 'Breakfast Blend' },
                { "ID": '992883', "Supplier": 'UNFI', "name": 'Colombian' },
                { "ID": '1628429', "Supplier": 'KEHE', "name": 'White Rice Flour' },
                { "ID": '64834', "Supplier": 'KEHE', "name": 'Cornstarch' },
                { "ID": '340257', "Supplier": 'KEHE', "name": 'Whole Wheat Flour' },
                { "ID": '113858', "Supplier": 'KEHE', "name": 'Guatemalan Atitlan' },
                { "ID": '331150', "Supplier": 'KEHE', "name": 'Brown Rice Flour' },
                { "ID": '10438', "Supplier": 'KEHE', "name": 'Vital Wheat Gluten' },
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
            indexingIdType: 'distbId'
        };

    

        this.url = 'http://localhost:5000'
        this.name = 'res'
        this.handleUpload = this.handleUpload.bind(this);
        this.submitMapping = this.submitMapping.bind(this);
        this.fetchMatches = this.fetchMatches.bind(this);
        this.createCsv = this.createCsv.bind(this)
        this.reject = this.reject.bind(this)
        this.setIndexingIdType = this.setIndexingIdType.bind(this)
    }

    //Upload
    handleUpload(ev) {
        ev.preventDefault();
        this.name = this.uploadInput.files[0].name
        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
        data.append('filename', 'convert');

        fetch(`${this.url}/api/harmonize/upload`, {
            method: 'POST',
            body: data,
        }).then(response => response.json())
            .then((data) => {
                console.log(data)
                this.setState({ ['rawData']: data })
            });
    }

    //Mapping
    setIndexingIdType(type) {
        this.setState({ ['indexingIdType']: type})
    }

    submitMapping(distbName, distbIdName, productName, upcName) {
        const rawData = this.state.rawData
        let mappedData = rawData.map((row) => {
            let nums = '1234567890'
            let distbId
            if (row[distbIdName]) {
                distbId = row[distbIdName].split('').filter((char) => { return nums.includes(char) }).join('')
            }
            return {
                distb: row[distbName],
                distbId: distbId,
                product: row[productName],
                upc: row[upcName] || ''
            }
        });
        console.log("submitMapping mappedData: ", mappedData); console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

        mappedData = mappedData.filter((row) => { return (row[this.state.indexingIdType].length != 0) })
        this.setState({
            ["rawData"]: [],
            ["mappedData"]: mappedData,
        })
        this.fetchMatches(mappedData)

    }

    //Matching
    fetchMatches(sourceData) {
        console.log("fetchMatches sourceData: ", sourceData); console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        
        const distbs = {}
        sourceData.forEach((row) => {
            if (row["distbId"].length != 0){
                if (distbs[row["distb"]]) {
                    distbs[row["distb"]].push({distbId: row["distbId"], upc: row['upc']})
                } else {
                    distbs[row["distb"]] = [{ distbId: row["distbId"], upc: row['upc'] }]
                }
            }
        })
        const formData = new FormData();
        formData.append('distbs', JSON.stringify(distbs));
        formData.append('indexingIdType', JSON.stringify(this.state.indexingIdType));

        fetch(`${this.url}/api/harmonize/match`, {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then((matches) => {            
            console.log("fetchMatches matches: ", matches); console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            
            
            this.mapMatches(matches, sourceData)

        });
    }

    mapMatches(matches, sourceData) {
        console.log("mapMatches this.state.indexingIdType: ", this.state.indexingIdType); console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

        if (this.state.indexingIdType === 'upc') {
            this.mapUpcMatches(matches, sourceData)
        } else if (this.state.indexingIdType === 'distbId') {
            console.log('pass')
            this.mapDistbIdMatches(matches, sourceData)
        }
    }

    mapUpcMatches(matches, sourceData) {
        const matchedData = this.state.matchedData
        let unmatchedData = this.state.unmatchedData

        console.log("mapUpcMatches matches: ", matches); console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        console.log("mapUpcMatches sourceData: ", sourceData); console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");


        sourceData.forEach((row) => {
            try {
                let matchedItems = []
                Object.entries(matches[row.distb]).forEach(([dbUpc, dbItem]) => {
                    if (dbUpc.includes(row.upc)) {
                        matchedItems.push({ ...dbItem, dbUpc })
                    }
                })
                console.log("mapUPCMatches row: ", row); console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

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
                        }
                        throw 'not Found';
                    }
                }
                matchedData.unshift({
                    ...row,
                    ['labelType']: matchedItem.labelType,
                    ["tlId"]: matchedItem.tlId,
                    ["dbProductName"]: matchedItem.dbProductName,
                    ["distbId"]: matchedItem.dbDistbId
                })
                unmatchedData = unmatchedData.filter((item) => { return item.product != row.product })
            } catch (err) {
                console.log(err)
            }
        });

        console.log("mapUpcMatches matchedData: ", matchedData); console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");


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
                        }
                        throw 'not Found';
                    }
                }
                matchedData.unshift({
                    ...row,
                    ['labelType']: matchedItem.labelType,
                    ["tlId"]: matchedItem.tlId,
                    ["dbProductName"]: matchedItem.dbProductName,
                    ["distbId"]: matchedItem.dbDistbId
                })
                unmatchedData = unmatchedData.filter((item) => { return item.product != row.product })
            } catch (err) {
                console.log(err)
            }
        });

        this.setState({
            ["matchedData"]: matchedData,
            ["unmatchedData"]: unmatchedData,
            ['mappedData']: []
        })
    }

    //Matches
    reject(idx) {
        let matchedData = this.state.matchedData
        let unmatchedData = this.state.unmatchedData
        unmatchedData.push({
            distb: matchedData[idx].distb,
            distbId: matchedData[idx].distbId,
            product: matchedData[idx].product,
            upc: matchedData[idx].upc,
            potentialMatches: []
        })
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

        fetch(`${this.url}/api/harmonize/download`, {
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
                <button onClick={() => { console.log(this.state) }}>See State</button>
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




