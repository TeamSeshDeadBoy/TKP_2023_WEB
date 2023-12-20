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
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(cors());

server.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
});

// USEFULL
import {
  doesJsonHave, handleMissingProperties, reqNotifier, logJson,
} from "./_myTools.mjs"


// test
app.get('/getTest.html', (req, res) => {
  reqNotifier(req)
  res.sendFile(path.join(__dirname, 'getTest.html'));
});


// Prisma DB functions
import {
  deleteAllUsers,createUser,deleteUserById,getUser
} from "./prisma/_userFunctions.mjs";
import { 
  updateUsersQuizzes, 
} from './prisma/_quizFunctions.mjs';


import {
  IdTree
} from "./algorithms.mjs";


async function clearDB(){
  await deleteAllUsers()
}


// At Start
clearDB()
var userIds = new IdTree(4)
var playerIds = new IdTree(5);
var socketsData = {};


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





io.on('connection', (socket) => {
  console.log(`socket connect recieved: ${socket.id}`);

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
    if (io.sockets.adapter.rooms.has(data.roomId)){
      if (data.userId) {
        console.log(`join received from user ${data.userId} ${data.userName} to room: ${data.roomId}`);
        socket.join(data.roomId)
        io.to(data.roomId).emit('join',{userName: data.userName, userId: data.userId})
      } else {
        console.log(`join received from player ${data.userName} to room: ${data.roomId}`);
        var playerId = playerIds.getFreeId();
        if (playerId) {
          socketsData[socket.id] = {};
          socketsData[socket.id].userId = playerId;
          socketsData[socket.id].userName = data.userName;
          socketsData[socket.id].roomId = data.roomId;
          console.log(`player's id assigned ${playerId} ${data.userName}`);
          socket.join(data.roomId)
          socket.emit('joined',{playerId: playerId})
          io.to(data.roomId).emit('join',{userName: data.userName, userId: playerId})
        } else { console.log('failed');}
      }
    } else {
      console.log(`${data.userName} failed to join. Room ${data.roomId} does not exist`);
      socket.emit('joined',{})
    }
  });

  socket.on('create', (data) => {
    console.log(`create received for room ${data.id} ${data.userName}`);
    socketsData[socket.id] = {};
    socketsData[socket.id].userId = data.id;
    socketsData[socket.id].userName = data.userName;
    socketsData[socket.id].roomId = data.id;
    socket.join(data.id);
    io.to(data.id).emit('create',{})
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
    console.log(`next received for room: ${data.roomId} with question (# ${data.questionInd}): ${data.question.text}  with choices: ${data.choices}`)
    io.to(data.roomId).emit('next',{question:data.question, questionInd: data.questionInd})
  })
  socket.on('end', (data) => {
    console.log(`end received for room: ${data.roomId} with scores: ${data.scores}`);
    logJson(data.scores)
    io.to(data.roomId).emit('end',data)
  })
  socket.on('reveal', (data) => {
    console.log(`reveal received for room: ${data.roomId} choiceInd: ${data.choiceInd}`);
    io.to(data.roomId).emit('reveal',{choiceInd:data.choiceInd})
  })
  socket.on('disconnect', () => {
    console.log(`socket disconnect recieved: ${socket.id}`);
    if (socketsData[socket.id]){
      console.log("socket was found");
      if (socketsData[socket.id].roomId){
        console.log("socket room was found");
        io.to(socketsData[socket.id].roomId).emit('leave',{userId: socketsData[socket.id].playerId, userName: socketsData[socket.id].userName})
        console.log("leave event emitted");
      } else {console.log("didn't find socket's room");}
      console.log(playerIds.deleteId(socketsData[socket.id].userId));
      playerIds.visualize();
      console.log(`${socketsData[socket.id].userId} ${socketsData[socket.id].userName} disconnected`);
      delete socketsData[socket.id];
      console.log("socketsData deleted");
    } else {console.log("socket wasnt found in socketsData");}
  });
});