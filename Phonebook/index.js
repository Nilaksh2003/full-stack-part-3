const express = require('express')
const app=express()
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
app.get('/info',(request,response)=>{
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];
    
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
      const now = new Date();
      const year = now.getFullYear();
      const month = months[now.getMonth()];
      const dayOfWeek = days[now.getDay()];
      const day = now.getDate();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const timezoneOffset = now.getTimezoneOffset();
      const timezoneOffsetHours = Math.abs(Math.floor(timezoneOffset / 60));
      const timezoneOffsetMinutes = Math.abs(timezoneOffset) % 60;
      const timezoneSign = timezoneOffset < 0 ? '+' : '-';
    
      const formattedDate = `${dayOfWeek} ${month} ${day} ${year} ${hours}:${minutes}:${seconds} GMT${timezoneSign}${timezoneOffsetHours.toString().padStart(2, '0')}${timezoneOffsetMinutes.toString().padStart(2, '0')} (Eastern European Standard Time)`;
    response.send(`<p>Phonebook has info for ${phoneNumbers.length} people <br> ${formattedDate}</p>`)
})
const PORT = 3001
app.listen(PORT,()=>{
    console.log(`Server running on port${PORT}`)
})