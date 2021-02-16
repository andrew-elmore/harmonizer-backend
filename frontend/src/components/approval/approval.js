import React, {useState} from 'react'
import {approvalStyle} from './../styles'


const Approval = (props) => {
    const [fileName, setFileName] = useState('')

    if (props.incompleteData > 0 || props.completeData === 0){return null}
    
    let today = new Date(Date.now())
    let year = today.getFullYear().toString().slice(2)
    let month = (today.getMonth() + 1).toString()
    let day = (today.getDate()).toString()
    if (month.length === 1) { month = '0' + month }
    if (day.length === 1) { day = '0' + day }
    let date = `${year}${month}${day}`


    const handleChange = () => {
        return (e) => {
            setFileName( e.currentTarget.value)
        }
    }

    return (
        <div style={approvalStyle.container}>
            <input
                placeholder={'filename'}
                value={fileName}
                onChange={handleChange()}
            />
            <span>    {date}.csv</span>
            <br/>
            <button
                style={approvalStyle.button}
                onClick={() => {
                    props.createCsv((fileName + ` ${date}`))
                }}
            >Approve All</button>
        </div>
    )
}

export default Approval