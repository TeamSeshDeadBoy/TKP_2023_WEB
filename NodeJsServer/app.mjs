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
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/////////////////////////
// USEFULL

function logJsonSeachResult(jsonResult){
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
}
function respondJsonResult(res,jsonResult) {
  logJsonSeachResult(jsonResult)
  res.json(jsonResult)
  console.log(`json responded\n`); 
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
    console.error(`Sent message to client: Missing required properties in req.body: ${missingProperties.join(', ')}`);
    sendJson(res,{errorMessage: `Missing required properties in req.body: ${missingProperties.join(', ')}`})
    return false;
  }
  return true;
}



// useful (old)

// const sendJson = async (res, data) => { // ! old ! don't use JSON.stringify on "data"  // example: app.get('/json', (req, res) => sendJson(res,{id:2,name:"mom"}))
//     res.set('Content-Type', 'application/json');
//     res.json(data);
// };

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

var roomIds = new IdTree(5);
var userIds = new IdTree(6);

clearAllRooms()
clearAllUsers()


app.get('/createUser',(req,res)=>{
  requestNotifier(req)
  var userId = userIds.getFreeId();
  createUser(userId, 'DummyUser','dummy@dum.com','dumdum')
  sendJson(res,{message:'user created'})
})

app.post('/createRoom',(req,res)=>{
  requestNotifier(req);
  if (checkReqBodyToContain(req, res, 'userId')){
    var roomId = roomIds.getFreeId() // overflow
    createRoom(roomId)
    var userId = req.body.userId // overflow
    addRoomToUser(roomId, userId)
    sendJson(res,{message: "room created", id: roomId})
  }
})

//

app.get('/createRoom',(req,res)=>{
  requestNotifier(req);
  var roomId = roomIds.getFreeId() // overflow
  var userId = 'AAAAAA' // overflow
    createRoom(roomId,userId);
    // addRoomToUser(roomId, userId)
    sendJson(res,{message: "room created", id: roomId})
})


