import React from 'react'

function Alert(props) {
    return (
        <div style={{height: '80px'}}>

        {props.alert && <div className="alert alert-warning alert-dismissible fade show" role="alert">
         {props.alert.msg} <strong>{props.alert.type}</strong>
        </div>}
        
        </div>
        
    )
}

export default Alert