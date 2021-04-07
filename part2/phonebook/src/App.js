import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Submit from './components/Submit'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
	//------    COMPONENT STATES    ------//
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filterValue, setFilterValue] = useState('')
	const [notificationMessage, setNotificationMessage] = useState(null)

	useEffect(() => {
		console.log('Fetching contacts from server...')
		personService
			.getAll()
			.then((personsFromServer) => setPersons(personsFromServer))
			.catch((error) => {
				console.log(error.error.data)
			})
	}, [])

	//------    EVENT HANDLERS    ------//
	const handleFilterChange = (event) => {
		console.log('Filter -> ', event.target.value)
		setFilterValue(event.target.value)
	}

	const handleNameChange = (event) => {
		console.log('Current input value : ', event.target.value)
		setNewName(event.target.value)
	}
	const handlePhoneChange = (event) => {
		console.log('Current phone value : ->', event.target.value)
		setNewNumber(event.target.value)
	}

	const displayNotification = (notificationType, message) => {
		setNotificationMessage({ notificationType, message })
		setTimeout(() => {
			setNotificationMessage(null)
		}, 5000)
	}
	//------    ADD PERSON BUTTON HANDLER    ------//

	const addPerson = (event) => {
		event.preventDefault()
		const newPerson = { name: newName, number: newNumber }

		//first the case if the person already exists, try to update it
		if (persons.map((person) => person.name).includes(newName)) {
			console.log(`The entered name ${newName} already exists.`)
			const personToModify = persons.find((person) => person.name.toLowerCase() === newPerson.name.toLowerCase())
			const confirmation = window.confirm(`${newPerson.name} is already added to the phonebook, replace the old number with a new one ?`)
			//ask the user for confirmation
			if (confirmation) {
				personService
					.update(personToModify, newPerson)
					.then((modifiedPerson) => {
						const modifiedPersonList = [...persons] //Create a shallow copy of persons to further change is with the new modofied person
						modifiedPersonList.forEach((person) => {
							if (person.name.toLowerCase() === modifiedPerson.name.toLowerCase()) {
								person.number = modifiedPerson.number
							}
						})
						displayNotification('info', `Successfully modified ${newPerson.name} with the new number ${newPerson.number}`)
						setPersons(modifiedPersonList)
						setNewName('')
						setNewNumber('')
					})
					.catch((error) => {
						if(error.response.data.error === 'malformatted id'){
							//the case when when we try to modify data that has been deleted from the server
							displayNotification('error', "The person doesn't exist")
							setPersons(persons.filter(person => person.name.toLowerCase() !== newPerson.name.toLowerCase()))
							setNewName('')
							setNewNumber('')
							
						}else{
							displayNotification('error', error.response.data.error)
						}
						console.log(error.response.data)
					})
			}
		} else {
			personService
				.create(newPerson)
				.then((addedPerson) => {
					setPersons(persons.concat(addedPerson))
					displayNotification('info', `Successfully added ${newPerson.name} with the number ${newPerson.number}`)
					setNewName('')
					setNewNumber('')
				})
				.catch((error) => {
					displayNotification('error', error.response.data.error)
					console.log(error.response.data)
				})
		}
	}

	//------    REMOVE PERSON BUTTON HANDLER    ------//

	const removePerson = (id) => {
		const personToDelete = persons.find((person) => person.id === id)
		const confirmation = window.confirm(`Are you sure you want to delete ${personToDelete.name} from your contacts ?`)
		if (confirmation) {
			personService.remove(personToDelete).then(() => {
				setPersons(persons.filter((person) => person.id !== id))
				console.log('Deleted')
				displayNotification('info', `${personToDelete.name} has been removed from your contacts.`)
			})
		}
	}

	//------    RETURN FIELD OF THE COMPONENT    ------//
	return (
		<div>
			<h1>Phonebook</h1>

			<Notification message={notificationMessage} />

			<Filter onChangeHandler={handleFilterChange} />
			<Submit
				onSubmitHandler={addPerson}
				phoneChangeHandler={handlePhoneChange}
				nameChangeHandler={handleNameChange}
				nameValue={newName}
				phoneValue={newNumber}
			/>
			<h2>Persons</h2>
			<Persons persons={persons} filterValue={filterValue} deletePersonHandler={removePerson} />
		</div>
	)
}

export default App
