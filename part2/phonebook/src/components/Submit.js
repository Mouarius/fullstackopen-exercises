import React from 'react';

const Submit = ({onSubmitHandler, nameChangeHandler, phoneChangeHandler, nameValue, phoneValue}) => {
    return (
        <form onSubmit={onSubmitHandler}>
            <h3>Add a new person :</h3>
        <ul>
            <li>
                <label htmlFor="name">Name :</label>
                <input onChange={nameChangeHandler} type='text' id='name' value={nameValue}/>
            </li>
            <li>
                <label htmlFor="phone">Phone :</label>
                <input onChange={phoneChangeHandler} type='phone' id='phone' value={phoneValue}/>
            </li>
        </ul>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    );
};

export default Submit;