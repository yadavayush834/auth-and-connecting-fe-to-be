const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "ayush123";
const app = express();
app.use(express.json());

const users = [];
app.post('/signup',function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    users.push({
        username:username,
        password:password
    })
    res.json({
        message:"you are signed in"
    })
})

app.post('/signin',function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    let founduser = null;

    for(let i =0 ; i< users.length; i++){
        if(users[i].username === username && users[i].password === password){
            founduser = users[i];
        }
    }
    if(!founduser){
        res.json({
            message:"invalid credentials"
        })
        return
    }
    else{
        const token = jwt.sign({
            username
        },JWT_SECRET)
        res.json({
            token:token
        })

    }
})

app.get('/me',function(req,res){
    const token = req.headers.token;
    const decodedata = jwt.verify(token,JWT_SECRET);

    if(decodedata.username){
        let founduser = null;

        for(let i =0 ; i< users.length(); i++){
            if(users[i].username === decodedata.username){
                founduser = users[i];
            }
        }
        res.json({
            username: founduser.username,
            password : founduser.password
        })
    }
})

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

