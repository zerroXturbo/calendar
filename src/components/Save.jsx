import React from 'react';

const Save = props => (
    <form onSubmit={props.saveText}>
        <button>Save</button>
    </form>
);

export default Save;