import React from 'react';

const Form = props => {
    return (
        <form onSubmit={props.btnPush}>
            <button id={'btn-form'}>{props.value}</button>
        </form>
    );
}

export default Form