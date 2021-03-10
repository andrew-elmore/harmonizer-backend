import React, { useState } from 'react'
import { unmatchedStyle } from '../styles'


const UnmatchedElement = (props) => {
    const [originalItem, setOriginalItem] = useState(props.unmatchedItem)
    const [unmatchedItem, setUnmatchedItem] = useState(props.unmatchedItem)
    if (props.unmatchedItem != originalItem){
        setOriginalItem(props.unmatchedItem)
        setUnmatchedItem(props.unmatchedItem)

    }
    
    
    if (unmatchedItem.length === 0) { return null }

    const handleChange = (field) => {
        return (e) => {
            setUnmatchedItem({ ...unmatchedItem, [field]: e.currentTarget.value })
        }
    }

    const selectPotentialMatch = (distbId) => {
        setUnmatchedItem({ ...unmatchedItem, ['distbId']: distbId })
    }

    
    

    return (
        <div style={unmatchedStyle.field.container}>
            <div style={unmatchedStyle.originalData.container}>

                DISTB_ID: <input
                    value={unmatchedItem.distbId}
                    onChange={handleChange('distbId')}
                />
                <br />
                <br />
                DISTB: <input
                    value={unmatchedItem.distb}
                    onChange={handleChange('distb')}
                />
                <br />
                <br />
                UPC: <input
                    value={unmatchedItem.upc}
                    onChange={handleChange('upc')}
                />
                <br />
                <br />
                <div>BRAND: {unmatchedItem.brand}</div>
                <div>PRODUCT: {unmatchedItem.product}</div>
            </div>

            <div style={unmatchedStyle.dbData.container}>
                {unmatchedItem.potentialMatches.map((potentialMatch, idx) => {
                    return(<div key={idx}>
                        <div>DISTB_ID: {potentialMatch.dbDistbId}</div>
                        <div>TL_ID: {potentialMatch.tlId}</div>
                        <div>LABEL_TYPE: {potentialMatch.labelType}</div>
                        <div>BRAND: {potentialMatch.productData['BRAND']}</div>
                        <div>PRODUCT: {potentialMatch.dbProductName}</div>
                        <div>UPC: {potentialMatch.dbUpc}</div>
                        <button
                            style={{...unmatchedStyle.searchButton, marginBottom: 10}}
                            onClick={() => { 
                                selectPotentialMatch(potentialMatch.dbDistbId)
                                props.fetchMatches([{ ...unmatchedItem, ['distbId']: potentialMatch.dbDistbId, ['upc']: potentialMatch.dbUpc}]) 
                            }}
                        >Select</button>
                    </div>)
                })}
                <button
                    style={{ ...unmatchedStyle.searchButton, marginBottom: 10 }}
                    onClick={() => {
                        props.fetchMatches([{ ...unmatchedItem}])
                    }}
                >Search</button>
                <button
                    style={{ ...unmatchedStyle.searchButton, marginBottom: 10 }}
                    onClick={() => {
                        props.notInDatabase(unmatchedItem, props.idx)
                    }}
                >Not In Database</button>
            </div>
        </div>

    )
}

export default UnmatchedElement