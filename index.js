if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

const updateOptions = { new: true, runValidators: true, context: 'query' }

morgan.token('content', (req) => {
  return JSON.stringify(req.body)
})

app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :content'
  )
)

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.get('/info', (req, res) => {
  const reqDate = new Date()
  Person.find({}).then((persons) => {
    res
      .status(200)
      .send(
        `<p>Phonebook has info for ${
          persons.length
        } people <br/><br/> ${reqDate.toUTCString()}</p>`
      )
  })
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.status(200).json(persons)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
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
  Person.findByIdAndRemove(id).then(() => {
    res.status(204).end()
  })
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body
  Person.find({})
    .then(() => {
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
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).json({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`)
})
