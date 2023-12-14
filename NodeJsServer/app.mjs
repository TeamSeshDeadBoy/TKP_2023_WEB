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
const io = new Server(server, {cors: {origin: "http://localhost:5173"}});

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

function logJson(json) {
  if (Array.isArray(json)) {
    console.log('[');
    json.forEach((element) => {
      console.log(`${JSON.stringify(element)},`);
    });
    console.log(']');
  } else {
    console.log(JSON.stringify(json));
  }  
}
function reqNotifier(req) {
  console.log('');
  console.log(`${req.method} request received for: ${req.originalUrl}`);
  console.log(`request body: ${JSON.stringify(req.body)}`);
}

function handleMissingProperties(missingProperties){
  if (Array.isArray(missingProperties)){
    // res.status(400).json({msg:`Missing required properties in req.body: ${missingProperties.join(', ')}`})
  }
}

function doesJsonHave(json, fHandleMissingProperties, ...requiredProperties) { // example: if (checkReqBodyToContain(req, res, 'name', 'email', 'password'))
  var missingProperties = [];
  for (const prop of requiredProperties) {
    if (!(prop in json)) {
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
import { log } from 'console';


async function clearDB(){
  await deleteAllUsers()
}

var userIds = new IdTree(4);


function start(){
  clearDB()
};

start()
if (userIds instanceof IdTree)

app.post('/getUser',(req,res)=>{
  reqNotifier(req);
  if (doesJsonHave(req.body, handleMissingProperties, 'email', 'password')){
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
  if (doesJsonHave(req.body, handleMissingProperties, 'name','email','password')){
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
  if (doesJsonHave(req.body,handleMissingProperties,'id')){
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
  if (doesJsonHave(req.body,handleMissingProperties,'userId','quizzes')){
    updateUsersQuizzes(req.body.userId,req.body.quizzes).then(result=>{
      if (result) res.status(200).json({msg:'Success'})
      else res.status(400).json({msg: "Failed to update"})
    })
  }
})


var playerIds = new IdTree(5);
var socketsToPlayerIds = {};
io.on('connection', (socket) => {
  console.log(`A user connected with ID: ${socket.id}`);

  function handleSocketMissingProperties(missingProperties){
    if (Array.isArray(missingProperties)){
      socket.emit('missingProperties', {msg:`Missing required properties in socket.body: ${missingProperties.join(', ')}`})
    }
  }

  socket.on('bark', (data) => {
    socket.rooms.forEach((room) => {
      io.to(room).emit('bark',{msg: `user ${data.userName} barked in room ${room}`})
    });
  })

  socket.on('join', (data) => {
    if (data.userId) {
      console.log(`join received from user ${data.userId} ${data.userName} to room: ${data.roomId}`);
      socket.join(data.roomId)
      io.to(data.roomId).emit('join',{userName: data.userName, userId: data.userId})
    } else {
      console.log(`join received from player ${data.userName} to room: ${data.roomId}`);
      var playerId = playerIds.getFreeId();
      
      if (playerId) {
        socketsToPlayerIds[socket] = playerId;
        console.log(`player's id assigned ${playerId} ${data.userName}`);
        socket.join(data.roomId)
        socket.emit('joined',{userId: playerId})
        io.to(data.roomId).emit('join',{userName: data.userName, userId: playerId})
      } else {
        console.log('failed');
      }
    }
    
    
  });

  socket.on('create', (data) => {
    console.log(`create received for room ${data.id} ${data.userName} with quiz: ${data.quiz}`);
    io.to(data.roomId).emit('create',{})
  })

  socket.on('start', (data) => {
    console.log(`start received for room: ${data.roomId}`)
    io.to(data.roomId).emit('start',{})
  })

  socket.on('choice', (data) => {
    console.log(`choice received for room: ${data.roomId} from user ${data.userId} on question ${data.questionInd} with choice: ${data.choiceInd}`)
    io.to(data.roomId).emit('choice',{userId: data.userId, questionInd: data.questionInd, choiceInd: data.choiceInd})
  })

  socket.on('next', (data) => {
    console.log(`next received for room: ${data.roomId}`)
    var question;
    io.to(data.roomId).emit('next',{question:question})
  })

  socket.on('end', (data) => {
    console.log(`end received for room: ${data.roomId}`);
    var scores = [];
    io.to(data.roomId).emit('end',{scores:scores})
  })

  socket.on('reveal', (data) => {
    console.log(`reveal received for room: ${data.roomId} question: ${data.questionInd}`);
    var choiceInd;
    io.to(data.roomId).emit('reveal',{choiceInd:choiceInd})
  })


  // Listen for disconnection
  socket.on('disconnect', () => {
    socket.rooms.forEach((room) => {
      io.to(room).emit('leave',{userId: userId})
      // socket.leave(room)
    });
    playerIds.deleteId(socketsToPlayerIds[socket]);
    console.log(`${socketsToPlayerIds[socket]} disconnected`);
    delete socketsToPlayerIds[socket];
  });
});