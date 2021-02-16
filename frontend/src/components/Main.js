import React from 'react';

import download from 'downloadjs'

import Mapping from './mapping/mapping'
import Matched from './matching/matched'
import Unmatched from './matching/unmatched'
import Approval from './approval/approval'
import {uploadStyle} from './styles'

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
            fileName: ''
        };

    

        this.url = 'http://localhost:5000'
        this.name = 'res'
        this.handleUpload = this.handleUpload.bind(this);
        this.submitMapping = this.submitMapping.bind(this);
        this.fetchMatches = this.fetchMatches.bind(this);
        this.createCsv = this.createCsv.bind(this)
        this.approve = this.approve.bind(this)
        this.reject = this.reject.bind(this)
    }

    approve(idx) {
        let matchedData = this.state.matchedData
        matchedData = matchedData.map((row, i) => {
            if (idx === i) {
                return {...row, approved: true}
            } else {
                return row
            }
        })
        this.setState({ ['matchedData']: matchedData})
    }

    reject(idx) {
        let matchedData = this.state.matchedData
        let unmatchedData = this.state.unmatchedData
        unmatchedData.push({
            distb: matchedData[idx].distb,
            distbId: matchedData[idx].distbId,
            product: matchedData[idx].product,
        })
        matchedData = matchedData.filter((row, i) => { return i != idx})
        this.setState({ 
            ['matchedData']: matchedData, 
            ['unmatchedData']: unmatchedData
        })
    }

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


    fetchMatches(sourceData) {
        const distbs = {}
        sourceData.forEach((row) => {
            // console.log(row["distbId"], ': ', row["distbId"].length)
            if (row["distbId"].length != 0){
                if (distbs[row["distb"]]) {
                    distbs[row["distb"]].push(row["distbId"])
                } else {
                    distbs[row["distb"]] = [(row["distbId"])]
                }
            }
        })
        const formData = new FormData();
        formData.append('distbs', JSON.stringify(distbs));

        fetch(`${this.url}/api/harmonize/match`, {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then((matches) => {            
            const matchedData = this.state.matchedData
            let unmatchedData = this.state.unmatchedData

            sourceData.forEach((row) => {
                try{
                    let matchedItems = []
                    Object.entries(matches[row.distb]).forEach(([dbDistbId, dbItem])=>{
                        if (dbDistbId.includes(row.distbId)){
                            matchedItems.push({...dbItem, dbDistbId})
                        }
                    })
                    let matchedItem = null
                    if (matchedItems.length === 1) {
                        matchedItem = matchedItems[0]

                        
                    } else {
                        let exactMatches = matchedItems.filter((item) => { return row.distbId === item.dbDistbId })
                        if (exactMatches.length === 1){
                            matchedItem = matchedItems[0]
                        } else {
                            console.log(matchedItems)
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
                    unmatchedData = unmatchedData.filter((item) => {return item.product != row.product})
                } catch (err) {
                    console.log(err)
                    // console.log(matchedItems)
                    // if (unmatchedData.filter((item) => { return( item.product === row.product ) }).length === 0){
                    //     unmatchedData.push(row)
                    // }
                }
            });

            this.setState({
                ["matchedData"]: matchedData,
                ["unmatchedData"]: unmatchedData,
                ['mappedData']: []
            })

        });
    }

    submitMapping(distbName, distbIdName, productName) {
        const rawData = this.state.rawData
        let mappedData = rawData.map((row) => {
            let nums = '1234567890'
            let distbId = row[distbIdName].split('').filter((char) => { return nums.includes(char)}).join('')
            console.log(distbId)
            return {
                distb: row[distbName],
                distbId: distbId,
                product: row[productName]
            }
        });
        mappedData = mappedData.filter((row) => { return (row['distbId'].length != 0)})
        this.setState({
            ["rawData"]: [],
            ["mappedData"]: mappedData
        })
        this.fetchMatches(mappedData)

    }

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
            // console.log(data)
            this.setState({ ['rawData']: data })
        });
    }



    render() {
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
                <Mapping
                    rawData={this.state.rawData}
                    submitMapping={(distbName, distbIdName, productName) => { this.submitMapping(distbName, distbIdName, productName)}}
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
                    approve={(idx) => { this.approve(idx)}}
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




