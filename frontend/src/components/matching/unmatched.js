import React, {useState}from 'react'
import { unmatchedStyle, tLBlue} from './../styles'
import UnmatchedElement from './unmatchedElement'


const Unmatched = (props) => {

    if (props.unmatchedData.length === 0){return (  null  )}
    console.log(props.unmatchedData)
    return (
        <div style={unmatchedStyle.container}>
            <div
                style={{
                    color: tLBlue,
                    fontSize: 25,
                    fontWeight: 'bold',
                    textAlign: 'center'
                }}
            >Unmatched</div>

            {props.unmatchedData.map((unmatchedItem, idx) => {
                console.log(unmatchedItem)
                return (
                    <UnmatchedElement
                        key={idx}
                        idx={idx}
                        unmatchedItem={unmatchedItem}
                        fetchMatches={(item) => { props.fetchMatches(item) }}
                        notInDatabase={(item, idx) => { props.notInDatabase(item, idx)}}
                    />
                )
            })}
        </div>
    )
}

export default Unmatched