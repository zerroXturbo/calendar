import React from 'react';
import './Form.css'

const Form = props => {
    return (
        <form onSubmit={props.btnPush}>
            <button id={'btn-form'}>{props.value}</button>
        </form>
    );
}

export default Form