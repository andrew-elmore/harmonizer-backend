import React, {useState} from 'react'
import { mappingStyle } from './../styles'

const Mapping = (props) => {


    

    // const [distb, setDistib] = useState('Supplier')
    // const [distbId, setDistibId] = useState('ID')
    // const [product, setProduct] = useState('name')
    const [distbId, setDistibId] = useState('')
    const [distb, setDistib] = useState('')
    const [product, setProduct] = useState('')


    
    if (props.rawData.length === 0) {return null}


    const sourceFields = Object.keys(props.rawData[0])
    if (sourceFields.includes('DISTB_ID')) { setDistibId('DISTB_ID')}
    if (sourceFields.includes('DISTB')) { setDistibId('DISTB')}
    if (sourceFields.includes('PRODUCT')) { setProduct('PRODUCT')}

    const conversionFields = [
        ['DISTB_ID', (sourceField) => { setDistibId(sourceField)}, distbId],
        ['DISTB', (sourceField) => { setDistib(sourceField)}, distb],
        ['PRODUCT', (sourceField) => { setProduct(sourceField)}, product],
    ]
    return (
        <div style={mappingStyle.container}>
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
                            </div>
                        )
                })}
            <button 
                style={{ ...mappingStyle.submitButton }}
                onClick={() => { props.submitMapping(distb, distbId, product)}}
            >Map Fields</button>
        </div>
    )


}

export default Mapping


