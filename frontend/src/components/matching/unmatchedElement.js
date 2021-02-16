import React, { useState } from 'react'
import { unmatchedStyle } from '../styles'


const UnmatchedElement = (props) => {
    const [unmatchedItem, setUnmatchedItem] = useState(props.unmatchedItem)
    if (unmatchedItem.length === 0) { return null }

    const handleChange = (field) => {
        return (e) => {
            setUnmatchedItem({ ...unmatchedItem, [field]: e.currentTarget.value })
        }
    }

    const selectPotentialMatch = (distbId) => {
        setUnmatchedItem({ ...unmatchedItem, ['distbId']: distbId })
    }
    console.log("UnmatchedElement unmatchedItem: ", unmatchedItem); console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    

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
                <div>PRODUCT: {unmatchedItem.product}</div>
            </div>

            <div style={unmatchedStyle.dbData.container}>
                {unmatchedItem.potentialMatches.map((potentialMatch) => {
                    return(<div>
                        <div>DISTB_ID: {potentialMatch.dbDistbId}</div>
                        <div>TL_ID: {potentialMatch.tlId}</div>
                        <div>LABEL_TYPE: {potentialMatch.labelType}</div>
                        <div>PRODUCT: {potentialMatch.dbProductName}</div>
                        <button
                            style={{...unmatchedStyle.searchButton, marginBottom: 10}}
                            onClick={() => { 
                                selectPotentialMatch(potentialMatch.dbDistbId)
                                props.fetchMatches([{ ...unmatchedItem, ['distbId']: potentialMatch.dbDistbId}]) 
                            }}
                        >Select</button>
                    </div>)
                })}
            </div>
        </div>

    )
}

export default UnmatchedElement