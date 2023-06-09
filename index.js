const connectToMongo = require('./db');  //import external module into this file.(export of module are returned )
const express = require('express')  
// const cors=require('cors')
connectToMongo();
const app = express()    //Create a new express appplication in app instance
const port = process.env.PORT || 6000

app.use(express.json()) //is used to add a middleware function to the application's request processing pipeline. This ensures that any incoming requests with a JSON payload will be parsed, and the resulting data will be available in req.body within the route handlers.
// app.use(cors())
app.use('/api/user', require('./routes/user'))
app.listen(port, () => {
  console.log(`backend listening at http://localhost:${port}`)
})