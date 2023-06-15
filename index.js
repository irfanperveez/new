const express = require('express');

const db = require('./compile/db');   //import external module into this file.(export of module are returned )
const port = process.env.PORT || 6000

// Test DB
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))

const app = express();  //Create a new express appplication in app instance
app.use(express.json()) //is used to add a middleware function to the application's request processing pipeline. This ensures that any incoming requests with a JSON payload will be parsed, and the resulting data will be available in req.body within the route handlers.
// app.use(cors())

app.use('/api/user', require('./routes/user'));



const PORT = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`backend listening at http://localhost:${port}`)
  })