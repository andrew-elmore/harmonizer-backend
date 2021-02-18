import React, {useState}from 'react'
import { unmatchedStyle} from './../styles'
import UnmatchedElement from './unmatchedElement'


const Unmatched = (props) => {

    if (props.unmatchedData.length === 0){return null}
    return (
        <div style={unmatchedStyle.container}>
            <h1>Unmatched</h1>

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