import React from 'react';

const Button = props => (
    <form onSubmit={props.buttonSave}>
        <button id={'buttonEditor'}>{props.value}</button>
    </form>
);

export default Button;