import React from 'react';

const Filter = ({filterChangeHandler}) => {
    return (
        <p>find a country : <input type='text' onChange={filterChangeHandler}></input></p>
    );
};

export default Filter;