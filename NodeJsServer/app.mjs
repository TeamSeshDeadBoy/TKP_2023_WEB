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
function reqNotifier(req) {
  console.log('');
  console.log(`${req.method} request received for: ${req.originalUrl}`);
  console.log(`request body: ${JSON.stringify(req.body)}`);
}


async function sendJson(res,data){  // example: sendJson(res,{id:2,name:"mom"})
  res.status(200).json(data)
}
async function sendError(res,data){
  res.status(500).json(data)
}

function doesReqBodyHave(req, res, ...requiredProperties) { // example: if (checkReqBodyToContain(req, res, 'name', 'email', 'password'))
  const missingProperties = [];
  for (const prop of requiredProperties) {
    if (!(prop in req.body)) {
      missingProperties.push(prop);
    }
  }
  if (missingProperties.length > 0) {
    sendError(res,{msg: `Missing required properties in req.body: ${missingProperties.join(', ')}`})
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

// app.get('/deleteUser',(req,res)=>{
//   requestNotifier(req)
//   deleteUserByEmail('dummy@dum.com')
//   sendJson(res,{body:'user deleted'})
// })

import {
  deleteAllUsers,
  createUser,
  deleteUserById
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


var userIds = new IdTree(6);;

function start(){
  clearDB().then(result=>{
    var userId = userIds.getFreeId();
    createUser(userId, {name:'DummyUser',email:'dummy@dum.com',password:'dumdum'},[]).then(result=>{
      var quiz = {title: "testQuiz", questions: [{text: "q1", choices:[{text:"choice1", isCorrect:false},{text:"choice2", isCorrect:false}]}]}
      var Quizzes = []
      Quizzes.push(quiz,quiz,quiz)
      updateUsersQuizzes(userId,Quizzes)
    })
    
  })
};

start()
if (userIds instanceof IdTree)

app.post('/createUser',(req,res)=>{
  reqNotifier(req);
  if (doesReqBodyHave(req,res,'name','email','password')){
    var userId = userIds.getFreeId();
    if (userId) {
      createUser(userId,{...req.body},[]).then(result=>{
        if (result) sendJson(res,{msg: "Success"})
        else sendError(res,{msg: "Failed to create"})
      })
    }else{
      sendError(res,{msg: "Failed to create: ran out of id's"})
    }
  }
})

app.post('/deleteUserbyId',(req,res)=>{
  reqNotifier(req);
  if (doesReqBodyHave(req,res,'userId')){
    deleteUserById(req.body.userId).then(result=>{
      if (result) sendJson(res,{msg: "Success"})
      else sendError(res,{msg:"Failed to delete"})
    })
  }
})

app.post('/updateUsersQuizzes',(req,res)=>{
  reqNotifier(req);
  if (doesReqBodyHave(req,res,'userId','quizzes')){
    updateUsersQuizzes(req.body.userId,req.body.quizzes).then(result=>{
      if (result) sendJson(res,{msg: "Success"})
      else sendError(res,{msg: "Failed to update"})
    })
  }
})

app.post('/setUsersCurrentQuizInd',(req,res)=>{
  reqNotifier(req);
  if (doesReqBodyHave(req,res,'userId','quizId')){
    setUsersCurrentQuizInd(req.body.userId,req.body.quizInd).then(result=>{
      if (result) sendJson(res,{msg: "Success"})
      else sendError(res,{msg: "Failed to set"})
    })
  }
})