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


async function sendJson(req,res,data){  // example: sendJson(req,res,{id:2,name:"mom"})
  res.set('Content-Type', 'application/json');
  res.json(data);
}



// useful (old)

// const sendJson = async (req, res, data) => { // ! old ! don't use JSON.stringify on "data"  // example: app.get('/json', (req, res) => sendJson(req,res,{id:2,name:"mom"}))
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

import {
  createUser,
  deleteUserByEmail,
  createRoom
} from "./prisma/prismaFunctions.mjs";

app.get('/createUser',(req,res)=>{
  requestNotifier(req)
  createUser('DummyUser','dummy@dum.com','dumdum')
  sendJson(req,res,{body:'user created'})
})

app.get('/deleteUser',(req,res)=>{
  requestNotifier(req)
  deleteUserByEmail('dummy@dum.com')
  sendJson(req,res,{body:'user deleted'})
})

app.get('/test',(req,res)=>{
  requestNotifier(req);
  sendJson(req,res,{data: "here is data"})
})

app.post('/createRoom',(req,res)=>{
  requestNotifier(req);
  try{
    console.log(req.body.id);
  } catch (e) {console.log(e);}
  createRoom()
  sendJson(req,res,{data: "room created", id: "123"})
})

app.get('/createRoom',(req,res)=>{
  requestNotifier(req);
  createRoom();
  sendJson(req,res,{data: "room created",  id: "123"})
})
