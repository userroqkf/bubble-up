const express = require('express')
const { Pool } = require('pg')
const app = express()
const port = 3000

const pool = new Pool({
  host: 'localhost',
  user: 'database-user'
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

