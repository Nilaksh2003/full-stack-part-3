const Person= require('./models/person')
require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const cors=require('cors');
const person = require('./models/person');
const app=express()
app.use(express.static('dist'))
app.use(cors())
morgan.token('req-body',(req)=>{
 return  JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))
app.use(express.json());
let phoneNumbers=[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
app.get('/api/persons',(request,response)=>{
  Person.find({}).then((persons)=>{
    response.json(persons)
  })
})
/* app.post('/api/persons',(request,response)=>{
  const phoneNumber=request.body
  if(!phoneNumber.name||!phoneNumber.number){
    response.status(400).json({'error':'Name and Number are required'}).end()
  }
  if(phoneNumbers.some(phone=>phone.name===phoneNumber.name))
  {
    response.status(400).json({'error':'Name must be unique'}).end()
  }
  phoneNumber.id=Math.floor(Math.random()*(10000000-0+1))+1
  phoneNumbers.push(phoneNumber)
  response.json(phoneNumber)
}) */
app.post('/api/persons',(request,response)=>{
  debugger
  const body=request.body
  if (!body || !body.name || !body.number) {
    return response.status(400).json({ error: 'content missing',data:body })
  }
  const person= new Person({
    name:body.name,
    number:body.number
  })
  person.save().then(savePerson=>{
    response.json(savePerson)
  })
})
app.get('/api/persons/:id',(request,response)=>{
    const id=request.params.id
    const person=phoneNumbers.find(phoneNumber=>phoneNumber.id===id)
    if(person)
    {
        response.json(person)
    }
    else{
        response.status(204).end()
    }
})
app.delete('/api/persons/:id',(request,response,next)=>{
  Person.findByIdAndDelete(request.params.id)
  .then(result=>{
    response.status(204).end()
  })
})
app.get('/info',(request,response)=>{
    response.send(`<p>Phonebook has info for ${phoneNumbers.length} people <br> ${new Date()}</p>`)
})
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server running on port${PORT}`)
})