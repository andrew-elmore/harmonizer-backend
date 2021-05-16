import React, { useState, useReducer} from 'react'
import { mappingStyle, tLBlue } from './../styles'

const reducer = (state, action) => {
    Object.freeze(state)
    return ({...state, [action.type]: action.payload})
}

const Mapping = (props) => {


    const [state, dispatch] = useReducer(reducer, {
        distbId: 'DISTB_ID',
        distb: 'DISTB',
        brand: 'BRAND',
        product: 'PRODUCT',
        upc: 'UPC',
        price: 'PRICE',
        plu: 'PLU'
    })
    
    if (props.rawData.length === 0) {return (null)}


    const sourceFields = Object.keys(props.rawData[0])


    const conversionFields = {
        distbId: 'DISTB_ID',
        distb: 'DISTB',
        brand: 'BRAND', 
        product: 'PRODUCT', 
        upc: 'UPC', 
        price: 'PRICE', 
        plu: 'PLU', 
    }

    const xButton = (fieldName) => {
        let buttonType = mappingStyle.line.unselectedButton
        console.log(state[fieldName])
        if (null === state[fieldName]) { buttonType = mappingStyle.line.selectedButton }
        return (
            <button
                key={'x'}
                style={{ ...buttonType }}
                onClick={() => { dispatch({ type: fieldName, payload: null }) }}
            >X</button>
        )
    }

 


    return (
        <div style={mappingStyle.container}>
            <div
                style={{
                    color: tLBlue,
                    fontSize: 25,
                    fontWeight: 'bold',
                    textAlign: 'center'
                }}
            >Mapping</div>                {Object.entries(state).map(([fieldName, corespondingField]) => {
                    const title = conversionFields[fieldName]
                    return (
                        <div style={mappingStyle.line.container} key={title}>
                            <div style={mappingStyle.line.title}>{title}: </div>
                            {sourceFields.map((sourceField) => {

                                let buttonType = mappingStyle.line.unselectedButton
                                if (sourceField === corespondingField) { buttonType = mappingStyle.line.selectedButton }
                                return (<button
                                    key={sourceField}
                                    style={{ ...buttonType }}
                                    onClick={() => { dispatch({ type: fieldName, payload: sourceField}) }}
                                >{sourceField}</button>)
                            })}
                            
                            {xButton(fieldName)}
                        </div>
                        
                    )
                })}

            <button 
                style={{ ...mappingStyle.submitButton }}
                onClick={() => { props.submitMapping(state)}}
            >Map Fields</button>
        </div>
    )


}

export default Mapping


