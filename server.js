const express = require('express');
const bodyParser = require('body-parser');
const Redis = require('redis');
const { createHash } = require('node:crypto');
const https = require('https');
const fs = require('fs');

const app = express();

const port = 3000;

const redisClient = Redis.createClient({url:'redis://127.0.0.1:6379'});

app.use(bodyParser.json()); //allow json requests | JSON(Javascript Object Notation)

https.createServer({
    key: fs.readFileSync('privkey1.pem'),
    cert: fs.readFileSync('cert1.pem'),
    chain: fs.readFileSync('fullchain1.pem')
  },
   app).listen(3000, () => {
    redisClient.connect();
    console.log('Listening...')
  });

app.get('/', (req, res)=> {
    res.send("Welcome to your Node Server!");
});

app.post('/login', async (req,res)=>{
    const loginBody = req.body;
    const userName = loginBody.userName; 
    const password = loginBody.password; // needs to be hashed
    const hashedPassword = password==null ? null : createHash('sha3-256').update(password).digest('hex');
    const redisPassword = password==null ? null : await redisClient.hGet('hashedpasswords',userName);
    // console.log("Password for "+userName+": "+ redisPassword);
    if (password!=null && hashedPassword===redisPassword){
        // on valid login
        res.send("Welcome, "+userName);
    }
    else{
        // invalid login
        res.status(401); //unauthorized
        res.send("Incorrect password");
    }
});