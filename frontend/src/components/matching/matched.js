import React, {useState} from 'react'
import {matchedStyle} from './../styles'


const Matched = (props) => {
    const matchedData = props.matchedData
    if (matchedData.length === 0) {return null}
    

    return(
        <div style={matchedStyle.container}>
            
            {matchedData.map((row, idx) => {

                
            return (
                <div style={{...matchedStyle.data.container}} key={idx}>
                    <div>
                    </div>
                    <div style={matchedStyle.data.originalData.container}>
                        <div>DISTB_ID: {row.distbId}</div>
                        <div>DISTB: {row.distb}</div>
                        <div>PRODUCT: {row.product}</div>
                        <div>UPC: {row.upc}</div>
                    </div>
                    <div style={matchedStyle.data.dbData.container}>
                        <div>TL_ID: {row.tlId}</div>
                        <div>LABEL_TYPE: {row.labelType}</div>
                        <div>PRODUCT: {row.dbProductName}</div>
                        <button
                            style={matchedStyle.rejectButton}
                            onClick={() => { props.reject(idx) }}
                        >Reject</button>
                    </div>
                </div>
            )
        })}</div>
    )
}

export default Matched