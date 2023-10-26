const express = require('express');
const morgan = require('morgan');
const app=express()
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
    response.json(phoneNumbers)
})
app.post('/api/persons',(request,response)=>{
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
})
app.get('/api/persons/:id',(request,response)=>{
    const id=Number(request.params.id)
    const person=phoneNumbers.find(phoneNumber=>phoneNumber.id===id)
    if(person)
    {
        response.json(person)
    }
    else{
        response.status(204).end()
    }
})
app.delete('/api/persons/:id',(request,response)=>{
    const id =Number(request.params.id)
    phoneNumbers=phoneNumbers.filter(phoneNumber=>phoneNumber.id!==id)
    response.status(204).end()
})
app.get('/info',(request,response)=>{
    response.send(`<p>Phonebook has info for ${phoneNumbers.length} people <br> ${new Date()}</p>`)
})
const PORT = 3001
app.listen(PORT,()=>{
    console.log(`Server running on port${PORT}`)
})