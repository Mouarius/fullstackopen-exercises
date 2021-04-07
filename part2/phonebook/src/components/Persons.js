import React from 'react';

const Persons = ({persons, filterValue, deletePersonHandler}) => {
    //------    PERSONS FILTERING PROCESS    ------//
  const personsToShow = [] //Create an empty array to contain the objects of persons to show, we need to declare it empty at each new state render to ensure that we only show the current filtervalue

  for(let i = 0 ; i < persons.length ; i++){

    //LOG DEVELOPPEMENT TESTS
    /* console.log(`persons[${i}] :>> `, persons[i].name.toLowerCase());
    console.log('includes a >>', persons[i].name.toLowerCase().includes('a')); */

    if (persons[i].name.toLowerCase().includes(filterValue.toLowerCase())){ //Compares the values of lower case name property of deach person in persons, with the actual filter value (lower case as well)
      personsToShow.push(persons[i])//If there is a match, we push the person to the persons to show array
      //console.log('Render the person :', persons[i].name);
    }
  }
  //const personsToShow = personsLowerCase.filter(person => person.name.includes(filterValue.toLowerCase()))
  //console.log('Persons to show -> ', personsToShow)

  //ISSUE : This type of filtering generates a new iteration of the array at each global state change (even when the filter hasn't changed for example) which is useless and can require many coputational resources.
    return (
        <table>
          <tbody>
            {personsToShow.map(person => 
            <tr key={person.id}>
                <td>{person.name}</td>
                <td>{person.number}</td>
                <td><button onClick={() => deletePersonHandler(person.id)}>delete</button></td>
            </tr>
            )}
          </tbody>
      </table>
    );
};

export default Persons;