// event bus implementation

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json()); // parse incoming requests with JSON payloads


app.post('/events', async (req, res) => {
  const event = req.body;

  axios.post('http://localhost:4000/events', event); // posts
  axios.post('http://localhost:4001/events', event); // comments
  axios.post('http://localhost:4002/events', event); // query

  res.send({ status: 'OK' }); // send back a response to the sender

});


app.listen(4005, () => {
  console.log('Listening on 4005');
});