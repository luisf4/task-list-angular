const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

 port = 8080;

// GET 
app.get('/batata', (req, res) =>{
  console.log(req.body);  
  res.status(200).send({  
      'messege enroll': 'data recived'  
  }) 
});


// Starts the server
app.listen(
  port,
  () => console.log('ON on port {http://localhost:8080}')
)
