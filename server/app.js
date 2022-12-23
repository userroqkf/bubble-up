const express = require('express')
const { Pool } = require('pg')
const app = express()
const port = 3000
const cors = require("cors");
const { create } = require('domain');
const bp = require('body-parser');

app.use(bp.json())
app.use(bp.urlencoded({extended: true}));

const bcrypt = require('bcrypt');
const { application } = require('express');
const saltRounds = 10;


app.use(cors());

const pool = new Pool({
  host: 'localhost',
  user: 'database-user'
})

app.get('/', (req, res) => {
  res.json({test:'Hello World!'})
})

//user auth bycrpt and cookieparser
const testDB = {
  testUser: "password123"
}

async function createUser(username, password) {
  const hashPassword =  await bcrypt.hash(password, saltRounds);
  if (hashPassword && !(username in testDB)) {
    testDB[username] = hashPassword
  }
  console.log(testDB)
}

app.get('/auth/', async (req, res) => {
  const {username, password} = req.body;
  console.log(testDB[username], password);
  const match = await bcrypt.compare(password, testDB[username]);
  console.log(match, "match")
  if (username in testDB && match) {
    console.log("true")
  }
  res.send("compelete")
})

app.post('/auth/', (req, res) => {
  const {username, password} = req.body;
  createUser(username, password)
    .then(() => {
      res.status(200).send("added user")
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 
