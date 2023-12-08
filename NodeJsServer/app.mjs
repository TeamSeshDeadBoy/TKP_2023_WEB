/////////////////////////
// ESSENTIALS

import express from 'express'; 
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.listen(3000, () => {
    console.log('');
    console.log('Server started on port 3000');
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
function requestNotifier(req) {
  console.log('');
  console.log(`${req.method} request received for: ${req.originalUrl}`);
  console.log(`request body: ${JSON.stringify(req.body)}`);
}


async function sendJson(res,data){  // example: sendJson(res,{id:2,name:"mom"})
  res.set('Content-Type', 'application/json');
  res.json(data);
}

function checkReqBodyToContain(req, res, ...requiredProperties) { // example: if (checkReqBodyToContain(req, res, 'name', 'email', 'password'))
  const missingProperties = [];
  for (const prop of requiredProperties) {
    if (!(prop in req.body)) {
      missingProperties.push(prop);
    }
  }
  if (missingProperties.length > 0) {
    console.log(`Sent message to client: Missing required properties in req.body: ${missingProperties.join(', ')}`);
    sendJson(res,{msg: new Error(`Missing required properties in req.body: ${missingProperties.join(', ')}`)})
    return false;
  }
  return true;
}

// test

app.get('/getTest.html', (req, res) => {
  requestNotifier(req)
  res.sendFile(path.join(__dirname, 'getTest.html'));
});

/////////////////////////
// OPTIONAL

// app.get('/deleteUser',(req,res)=>{
//   requestNotifier(req)
//   deleteUserByEmail('dummy@dum.com')
//   sendJson(res,{body:'user deleted'})
// })

// app.get('/test',(req,res)=>{
//   requestNotifier(req);
//   sendJson(res,{data: "here is data"})
// })

// app.get('/createRoom',(req,res)=>{
//   requestNotifier(req);
//   if (checkReqBodyToContain(req, res, 'name', 'email', 'password')){
//     //createRoom()
//     sendJson(res,{data: "room created", id: "123"})
//   }
// })

import {
  deleteAllUsers,
  createUser,
  deleteUserByEmail,
  deleteUserById
} from "./prisma/_userFunctions.mjs";

import {
  IdTree
} from "./algorithms.mjs";
import { log } from 'console';
import { updateUsersQuizzes } from './prisma/_quizFunctions.mjs';
import { type } from 'os';

async function clearDB(){
  await deleteAllUsers()
}


var userIds = new IdTree(6);;

function start(){
  clearDB().then(result=>{
    var userId = userIds.getFreeId();
    createUser(userId, {name:'DummyUser',email:'dummy@dum.com',password:'dumdum'})
    var quiz = {title: "testQuiz", Questions: [{text: "q1", isCorrect:false},{text:"q2",isCorrect:true}]}
    var Quizzes = []
    Quizzes.push(quiz,quiz,quiz)
    updateUsersQuizzes(userId,Quizzes)
  })
};

start()
if (userIds instanceof IdTree)

app.post('/createUser',(req,res)=>{
  requestNotifier(req);
  if (checkReqBodyToContain(req,res,'name','email','password')){
    var userId = userIds.getFreeId();
    if (userId) {
      createUser(userId,req.body).then(result=>{
        if (result) sendJson(res,{msg: "User created sucessfully"})
        else sendJson(res,{msg: new Error("failed to create user")})
      })
    }else{
      sendJson(res,{msg: new Error("Failed to create user. Ran out of id's")})
    }
  }
})

app.post('/deleteUserbyId',(req,res)=>{
  requestNotifier(req);
  if (checkReqBodyToContain(req,res,'userId')){
    deleteUserById(req.body.userId).then(result=>{
      if (result) sendJson(res,{msg: "User deleted successfully"})
      else sendJson(res,{msg:new Error("Failed to delete the user")})
    })
  }
})

app.post('/updateUsersQuizzes',(req,res)=>{
  requestNotifier(req);
  if (checkReqBodyToContain(req,res,'userId','quizzes')){
    updateUsersQuizzes(req.body).then(result=>{
      if (result) sendJson(res,{msg: "User's quizzes updated successfully"})
      else sendJson(res,{msg: new Error("Failed to update the quizzes")})
    })
  }
})