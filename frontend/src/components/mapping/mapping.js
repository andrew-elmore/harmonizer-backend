import React, {useState} from 'react'
import { mappingStyle, tLBlue } from './../styles'

const Mapping = (props) => {


    

    // const [distb, setDistib] = useState('Supplier')
    // const [distbId, setDistibId] = useState('ID')
    // const [product, setProduct] = useState('name')
    const [distbId, setDistibId] = useState('')
    const [distb, setDistib] = useState('')
    const [product, setProduct] = useState('')
    const [upc, setUpc] = useState('')
    const indexingIdType = props.indexingIdType
    const setIndexingIdType = props.setIndexingIdType

    
    if (props.rawData.length === 0) {return null}


    const sourceFields = Object.keys(props.rawData[0])
    if (sourceFields.includes('DISTB_ID')) { setDistibId('DISTB_ID')}
    if (sourceFields.includes('DISTB')) { setDistibId('DISTB')}
    if (sourceFields.includes('PRODUCT')) { setProduct('PRODUCT')}
    // if (sourceFields.includes('UPC')) { setUpc('UPC')}

    const conversionFields = [
        ['DISTB_ID', (sourceField) => { setDistibId(sourceField)}, distbId],
        ['DISTB', (sourceField) => { setDistib(sourceField)}, distb],
        ['PRODUCT', (sourceField) => { setProduct(sourceField)}, product],
        ['UPC', (sourceField) => { setUpc(sourceField)}, upc],
    ]

    const xButton = (stateField, setField) => {
        let buttonType = mappingStyle.line.unselectedButton
        if (null === stateField) { buttonType = mappingStyle.line.selectedButton }
        return (
            <button
                key={'x'}
                style={{ ...buttonType }}
                onClick={() => { setField(null) }}
            >X</button>
        )
    }

 


    return (
        <div style={mappingStyle.container}>
            <h1>Mapping</h1>
                {conversionFields.map(([title, setField, stateField]) => {
                        return (
                            <div style={mappingStyle.line.container} key={title}>
                                <div style={mappingStyle.line.title}>{title}: </div>
                                {sourceFields.map((sourceField) => {

                                    let buttonType = mappingStyle.line.unselectedButton
                                    if (sourceField === stateField) { buttonType = mappingStyle.line.selectedButton }
                                    return (<button
                                        key={sourceField}
                                        style={{ ...buttonType }}
                                        onClick={() => { setField(sourceField) }}
                                    >{sourceField}</button>)
                                })}
                                
                                {xButton(stateField, setField)}
                            </div>
                        )
                })}

            <button 
                style={{ ...mappingStyle.submitButton }}
                onClick={() => { props.submitMapping(distb, distbId, product, upc)}}
            >Map Fields</button>
        </div>
    )


}

export default Mapping


