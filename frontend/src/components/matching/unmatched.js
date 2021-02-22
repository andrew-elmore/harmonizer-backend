import React, {useState}from 'react'
import { unmatchedStyle, tLBlue} from './../styles'
import UnmatchedElement from './unmatchedElement'


const Unmatched = (props) => {

    if (props.unmatchedData.length === 0){return (  null  )}
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

            {props.unmatchedData.map((unmatchedItem) => {
                return (
                    <UnmatchedElement
                        key={unmatchedItem.distbId}
                        unmatchedItem={unmatchedItem}
                        fetchMatches={(item) => { props.fetchMatches(item) }}
                    />
                )
            })}
        </div>
    )
}

export default Unmatched