const express = require('express')
const app = express()
require('dotenv').config()
const tasks = require('./routes/task')
const connectDB = require('./db/connect')

const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.static('./public'))

app.use('/api/v1/tasks', tasks)

app.get('/fff', (req, res) => {
  res.status(200).json('eee')
})

app.all('*', (req, res) => {
  res.status(404).json('resource not found')
})

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, console.log(`server is listening on the port ${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()