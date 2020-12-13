require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

const updateOptions = { new: true, runValidators: true, context: 'query' }

morgan.token('content', (req) => {
	return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

app.use(cors())

app.use(express.static('build'))
app.use(express.json())

app.get(`/info`, (req, res) => {
	const reqDate = new Date()
	Person.find({}).then((persons) => {
		res.status(200).send(`<p>Phonebook has info for ${persons.length} people <br/><br/> ${reqDate.toUTCString()}</p>`)
	})
})

app.get('/api/persons', (req, res) => {
	Person.find({}).then((persons) => {
		res.status(200).json(persons)
	})
})

app.get(`/api/persons/:id`, (req, res, next) => {
	const id = req.params.id
	Person.findById(id)
		.then((person) => {
			if (person) {
				console.log(typeof person)
				res.status(200).json(person)
			} else {
				res.status(404).end()
			}
		})
		.catch((error) => {
			next(error)
		})
})

app.delete('/api/persons/:id', (req, res) => {
	const id = req.params.id
	Person.findByIdAndRemove(id).then((result) => {
		res.status(204).end()
	})
})

app.post('/api/persons', (req, res, next) => {
	const body = req.body
	Person.find({})
		.then((persons) => {
			var person = new Person({
				name: body.name,
				number: body.number,
			})
			person
				.save()
				.then((savedPerson) => res.status(201).json(savedPerson))
				.catch((err) => next(err))
		})
		.catch((err) => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
	const id = req.params.id
	const body = req.body
	Person.findByIdAndUpdate(id, body, updateOptions)
		.then((updatedNote) => {
			res.status(200).json(updatedNote)
		})
		.catch((err) => next(err))
})

const unknownEndpoint = (request, response) => {
	response.status(404).json({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
	//console.log('error.stack :>> ', error.stack);
	console.log(error.toString())
	//console.log('request :>> ', request);
	//console.log('response :>> ', response);
	//console.log('error.response.data :>> ', error.response.data);
	if (error.name === 'CastError' && error.kind === 'ObjectId') {
		return response.status(400).json({ error: 'malformatted id' })
	}
	if (error.name === 'ValidationError') {
		var nameError = error.errors.name
		var numberError = error.errors.number

		var errorMessage = new Array()
		// console.log('nameError :>> ', nameError)
		// console.log('nameError.kind :>> ', nameError.kind)
		// console.log('numberError :>> ', numberError);
		// console.log('numberError.kind :>> ', numberError.kind);
		if (nameError) {
			if (nameError.kind === 'unique') {
				// console.log('name unique')
				errorMessage.push({error: 'property must be unique'})
			}
			if (nameError.kind === 'required') {
				// console.log('name required')
				errorMessage.push({error: 'property is required'})
			}
		}
		if (numberError) {
			if (numberError.kind === 'unique') {
				// console.log('number unique')
				errorMessage.push({error: 'property must be unique'})
			}
			if (numberError.kind === 'required') {
				// console.log('number required')
				errorMessage.push({error: 'property is required'})
			}
		}
		console.log('errorMessage :>> ', errorMessage);
		return response.status(400).json(errorMessage)
	}
	next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}/`)
})
