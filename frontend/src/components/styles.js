export const tLBlue = 'rgb(30, 98, 130)'
export const tLRed = 'rgb(130, 30, 30)'
export const tLGreen = 'rgb(0, 124, 60)'

const button = {
    display: 'inline-block',
    border: 'none',
    borderRadius: 5,
    boxShadow: '1px 1px 5px grey',
    outline: 'none',
}

export const uploadStyle = {
        container: {
            margin: 10
            // border: '1px solid black'
        },
        button: {
            ...button
        },
        indexButton: {
            outline: 'none',
            display: 'flex',
            padding: 0,
            borderRadius: 2,
            margin: 15
        },
        upcIndexButton:{
            borderRadius: '0px 2px 2px 0px',
            padding: 2,
            paddingLeft: 5
        },
        distbIdIndexButton:{
            borderRadius: '2px 0px 0px 2px',
            padding: 2,
            paddingRight: 5

        }
    }

    
export const mappingStyle = {
        container: {
            margin: 10,
            // border: '1px solid black'
            boxShadow: '1px 1px 5px grey',
            padding: 10
        },
        line: {
            container: {
                margin: 10
            },
            title: {
            },
            unselectedButton: {
                ...button,
                color: 'black',
                backgroundColor: 'lightgrey',
                margin: 5
            },
            selectedButton: {
                ...button,
                color: 'white',
                backgroundColor: tLBlue,
                margin: 5
            }
        },
        submitButton: {
            ...button,
            backgroundColor: tLGreen,
            color: 'white',
            margin: 10,
            padding: 2
        },

    }

    export const matchedStyle = {
        container: {
            margin: 5,
            marginTop: 10,
            paddingTop: 5,
            backgroundColor: 'lightgrey'
        },
        approveButton: {
            ...button,
            backgroundColor: tLGreen,
            color: 'white',
            marginTop: 5,
            width: '100%'
        },
        rejectButton: {
            ...button,
            backgroundColor: tLRed,
            color: 'white',
            marginTop: 5,
            width: '100%'

        },
        data: {
            container: {
                backgroundColor: 'green',
                display: 'flex',
                margin: 10,
                boxShadow: '1px 1px 5px grey',

            },
            originalData: {
                container: {
                    backgroundColor: 'white',
                    width: '25%',
                    padding: 5
                }
            },
            dbData: {
                container: {
                    backgroundColor: 'white',
                    width: '75%',
                    padding: 5

                } 
            }
        }
    }



export const unmatchedStyle = {
    container: {
        margin: 5,
        marginTop: 10,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: 'lightgrey'
    },
    searchButton: {
        ...button,
        backgroundColor: tLBlue,
        color: 'white',
        marginTop: 5,
        width: '100%'
    },
    field: {
        container: {
            backgroundColor: 'white',
            margin: 10,
            padding: 5,
            boxShadow: '1px 1px 5px grey',
            display: 'flex',
        },
    },
    originalData: {
        container: {
            backgroundColor: 'white',
            width: '25%',
            padding: 5
        }
    },
    dbData: {
        container: {
            backgroundColor: 'white',
            width: '75%',
            padding: 5,
        } 
    }
}

export const approvalStyle = {
    container: {
        margin: 10,
        padding: 10,
        boxShadow: '1px 1px 5px grey',
    },
    button:{
        ...button,
        backgroundColor: tLGreen,
        color: 'white',
        marginTop: 5,
        width: '100%'
    }

}