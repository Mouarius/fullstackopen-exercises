require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

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
		res.status(200).send(`Phonebook has info for ${persons.length} people <br/><br/> ${reqDate.toUTCString()}`)
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

app.post('/api/persons', (req, res) => {
	const body = req.body
	Person.find({}).then((persons) => {
		console.log('body :>> ', body)
		console.log('persons :>> ', persons)
		if (body.number) {
			if (body.name) {
				if (persons.find((p) => p.name.toLowerCase() === body.name.toLowerCase())) {
					res.status(409).json({ error: `The name must be unique.` })
				} else {
					var person = new Person({
						name: body.name,
						number: body.number,
					})
					person
						.save()
						.then((savedPerson) => {
							res.status(201).json(savedPerson.toJSON())
						})
						.catch((error) => {
							res.status(400).json({ error: error })
						})
				}
			} else {
				res.status(400).json({ error: 'No name has been given.' })
			}
		} else {
			res.status(400).json({ error: 'No number has been given.' })
		}
	})
})

app.put('/api/persons/:id', (req, res, next) => {
	const id = req.params.id
	const body = req.body
	console.log('body :>> ', body);
	Person.findByIdAndUpdate(id, body, { new: true })
		.then((updatedNote) => {

			res.status(200).json(updatedNote)
		})
		.catch((err) => next(err))
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === 'CastError' && error.kind == 'ObjectId') {
		return response.status(400).send({ error: 'malformatted id' })
	}

	next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}/`)
})
