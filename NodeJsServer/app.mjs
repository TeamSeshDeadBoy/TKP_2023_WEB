/////////////////////////
// ESSENTIALS

import express from 'express'; 
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// const socket = new WebSocket("ws://localhost:8080");

app.use(express.json());
app.use(cors());

// app.listen(3000, () => {
//     console.log('');
//     console.log('Server started on port 3000');
// });

server.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/////////////////////////
// USEFULL

function logJson(jsonResult){
  if (Array.isArray(jsonResult)) {
    console.log("search result:");
    console.log('[');
    jsonResult.forEach((element) => {
      console.log(`${JSON.stringify(element)},`);
    });
    console.log(']');
  } else {
    console.log(`search result: ${JSON.stringify(jsonResult)}`);
  }  
}
function reqNotifier(req) {
  console.log('');
  console.log(`${req.method} request received for: ${req.originalUrl}`);
  console.log(`request body: ${JSON.stringify(req.body)}`);
}

function handleMissingProperties(missingProperties){
  if (Array.isArray(missingProperties)){
    res.status(400).json({msg:`Missing required properties in req.body: ${missingProperties.join(', ')}`})
  }
}

function doesReqBodyHave(req, fHandleMissingProperties, ...requiredProperties) { // example: if (checkReqBodyToContain(req, res, 'name', 'email', 'password'))
  var missingProperties = [];
  for (const prop of requiredProperties) {
    if (!(prop in req.body)) {
      missingProperties.push(prop);
    }
  }
  if (missingProperties.length > 0) {
    fHandleMissingProperties(missingProperties);
    return false;
  }
  return true;
}

// test
app.get('/getTest.html', (req, res) => {
  reqNotifier(req)
  res.sendFile(path.join(__dirname, 'getTest.html'));
});

/////////////////////////
// OPTIONAL


import {
  deleteAllUsers,
  createUser,
  deleteUserById,
  getUser
} from "./prisma/_userFunctions.mjs";

import {
  IdTree
} from "./algorithms.mjs";

import { 
  updateUsersQuizzes, 
} from './prisma/_quizFunctions.mjs';


async function clearDB(){
  await deleteAllUsers()
}


var userIds = new IdTree(4);;

function start(){
  clearDB().then(result=>{
    var userId = userIds.getFreeId();
    createUser(userId, {name:'DummyUser',email:'dummy@dum.com',password:'dumdumdum'},[]).then(result=>{
      var quiz = {title: "testQuiz", questions: [{text: "q1", answers:[{text:"choice1"},{text:"choice2"}], validIndex: 0}]}
      var Quizzes = []
      Quizzes.push(quiz,quiz,quiz)
      updateUsersQuizzes(userId,Quizzes)
    })
    
  })
};

start()
if (userIds instanceof IdTree)

app.post('/getUser',(req,res)=>{
  reqNotifier(req);
  if (doesReqBodyHave(req, handleMissingProperties, 'email', 'password')){
    try {
      getUser(req.body.email).then(result=>{
        if (result){
          if (result.password==req.body.password) res.status(200).json(result)
          else res.status(400).json({msg: 'Wrong password'})
        }else res.status(400).json({msg:'Failed to get'})
      })
    } catch (error) {
      res.status(500).json({msg:"Server error"})
    }
  }
})

app.post('/user',(req,res)=>{
  reqNotifier(req);
  if (doesReqBodyHave(req, handleMissingProperties, 'name','email','password')){
    try {
      var userId = userIds.getFreeId();
      if (userId) {
        createUser(userId,{...req.body},[]).then(result=>{
          if (result) res.status(200).json({id: userId ,msg: 'Success'}) 
          else res.status(400).json({msg:'Failed to create'})
        })
      }else{
        res.status(500).json({msg:"Failed to create: ran out of id's"})
      }
    } catch (error) {
      res.status(500).json({msg:"Server error"})
    }
  }
})

app.post('/deleteUser',(req,res)=>{
  reqNotifier(req);
  if (doesReqBodyHave(req,handleMissingProperties,'id')){
    try {
      deleteUserById(req.body.id).then(result=>{
        if (result) res.status(200).json({msg: 'Success'})
        else res.status(400).json({msg:'Failed to delete'})
      })
    } catch (error) {
      res.status(500).json({msg: 'Internal error'})
    }
  }
})

app.post('/usersQuizzes',(req,res)=>{
  reqNotifier(req);
  if (doesReqBodyHave(req,handleMissingProperties,'userId','quizzes')){
    updateUsersQuizzes(req.body.userId,req.body.quizzes).then(result=>{
      if (result) res.status(200).json({msg:'Success'})
      else res.status(400).json({msg: "Failed to update"})
    })
  }
})