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

app.get('/', (req, res) => {
	res.send('App is working')
})

app.get('/api/persons', (req, res) => {
	Person.find({}).then((persons) => {
		res.status(200).json(persons)
	})
})

app.get(`/info`, (req, res) => {
	const reqDate = new Date()
	Person.find({}).then((persons) => {
		res.status(200).send(`Phonebook has info for ${persons.length} people <br/><br/> ${reqDate.toUTCString()}`)
	})
})

app.get(`/api/persons/:id`, (req, res) => {
	const id = req.params.id
	Person.findById(id)
		.then((person) => {
			res.status(200).json(person)
		})
		.catch((error) => {
			res.status(404).json({ error: error })
		})
})

app.delete('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id)
	persons = persons.filter((person) => person.id !== id)
	res.status(204).end()
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
							res.status(201).json(savedPerson)
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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}/`)
})
