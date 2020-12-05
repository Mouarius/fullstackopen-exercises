const express = require('express')
const app = express()
const cors = require('cors')

var morgan = require('morgan')

morgan.token("content", (req)=>{
    return JSON.stringify(req.body)
})

app.use(cors())

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
    },
    {
        name: "Alice Capdemourlin",
        number: "33-23-6423122",
        id: 5
    }
]


app.get('/', (req, res) => {
    res.send("App is working")
})

app.get('/api/persons', (req, res) => {
    res.status(200).json(persons)
})

app.get(`/info`, (req, res) => {
    const reqDate = new Date()
    res.status(200).send(`Phonebook has info for ${persons.length} people <br/><br/> ${reqDate.toUTCString()}`)
})

app.get(`/api/persons/:id`, (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        res.status(200).json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const id = Math.floor(Math.random() * 10000)
    const person = req.body
    console.log('person :>> ', person);
    if (person.number) {
        if (person.name) {
            if (persons.find(p => p.name.toLowerCase() === person.name.toLowerCase())) {
                res.status(409).json({ error: `The name must be unique.` })
            } else {
                person.id = id
                console.log('person :>> ', person);
                persons = persons.concat(person)
                res.status(201).json(persons)
            }
        } else {
            res.status(400).json({error: 'No name has been given.'})
        }
    } else {
        res.status(400).json({error: 'No number has been given.'})
    }
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`)
})
