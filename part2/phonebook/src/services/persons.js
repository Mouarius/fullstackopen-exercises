import axios from 'axios'

const baseUrl = '/api/persons/'

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then((response) => response.data)
}

const create = (newPerson) => {
	const request = axios.post(baseUrl, newPerson)
	return request.then((response) => newPerson)
}

const remove = (person) => {
	const request = axios.delete(`${baseUrl}${person.id}`)
	return request.then(() => console.log(`${person.name} has been removed successfully !`))
}

const update = (personToModify, newPerson) => {
	const request = axios.put(`${baseUrl}${personToModify.id}`, newPerson)
	return request.then((response) => response.data)
}

const personService = {
	getAll,
	create,
	remove,
	update,
}

export default personService
