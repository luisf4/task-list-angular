import { firebaseConfig } from "./firebaseConfig.ts";
import { initializeApp } from "firebase/app";
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();

// Initialize the firebase 
const firebase = initializeApp(firebaseConfig);

// Set the json as the defoult
app.use(cors());
app.use(bodyParser.json());

// Set the port that API will run 
port = 8080;

// GET 
app.get('/api/get', (req, res) =>{
  console.log(req.body);  
  res.status(200).send({  
      'messege enroll': 'data recived'  
  }) 
});

app.post('/api/data', (req, res) => {
  // handle POST request for data
});


// Starts the server
app.listen(
  port,
  () => console.log('ON on port {http://localhost:8080}')
)
