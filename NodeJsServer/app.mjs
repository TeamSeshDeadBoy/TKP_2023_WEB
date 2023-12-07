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
    console.log('Server started on port 3000');
    console.log('');
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
  console.log(`${req.method} request received for: ${req.originalUrl}`);
  console.log(`request body: ${JSON.stringify(req.body)}`);
  console.log('');
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
    sendJson(res,{errorMessage: `Missing required properties in req.body: ${missingProperties.join(', ')}`})
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
  createUser,
  createRoom,
  //addRoomToUser,
  clearAllRooms,
  clearAllUsers,
} from "./prisma/prismaFunctions.mjs";

import {
  IdTree
} from "./algorithms.mjs";
import { log } from 'console';

async function clearDB(){
  await clearAllRooms()
  await clearAllUsers()
}

var roomIds, userIds;

function start(){
  clearDB().then(result=>{
    roomIds = new IdTree(5);
    userIds = new IdTree(6);
    var userId = userIds.getFreeId();
    createUser(userId, 'DummyUser','dummy@dum.com','dumdum')
  })
};
  

start()

app.post('/createRoom',(req,res)=>{
  requestNotifier(req);
  if (checkReqBodyToContain(req, res, 'userId')){

    var roomId = roomIds.getFreeId() // overflow
    //var userId = req.body.userId // overflow
    var userId = 'AAAAAA'
    try{
      createRoom(roomId,userId).then(result=>{
      console.log("createRoom(): "+logJson(result));
      })
    } catch (e) {
      console.log(e);
      sendJson(res,{message: "failed to create room"})
    } 
    sendJson(res,{message: "room created", id: roomId})
  }
})
