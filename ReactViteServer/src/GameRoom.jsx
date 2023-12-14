/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import './GameRoom.css'


const GameRoom = ({quiz, socket}) => {

    const UID = localStorage.getItem('userId')
    const userName = localStorage.getItem('userName')

    const [isConnected, setIsConnected] = useState(socket.connected);
    const [joined, setJoined] = useState(new Set());
    const [message, setMessage] = useState("");
    const [bark, setBark] = useState("");

    const messageToAllTest = () => {
      socket.emit('message', {userName: userName, message: "woof"})
    }

    const messageToRoomTest = () => {
      socket.emit('msg', {userId: UID, message: "woof"})
    }

    const messageToSingleRoomTest = () => {
      socket.emit('msg', {userId: "BAAA", message: "woof"})
    }
    useEffect(() => {
      let temp = joined
      console.log("temp",)
      temp.add(message.split(' ')[1])
      setJoined(temp)
    }, [message])
    


    useEffect(() => {
        socket.connect();
        socket.emit('join', {roomId: localStorage.getItem('userId'), userName: localStorage.getItem('userName')})
    

        function onMessageEvent(value) {
          console.log(value)
        }
    
        socket.on('bark', (msg) => {setBark(msg.msg)});
        socket.on('join', (obj) => {console.log(obj)});
        socket.on('message', onMessageEvent);
        socket.on('msg', (msg) => {setMessage(msg.msg)});
    
        return () => {
          socket.off();
          socket.disconnect();
        };
      }, []);
    
  return (
    <div>
      <code className="error">{message}</code>
        <h2>Комната викторины &ldquo;{quiz.title}&rdquo;</h2>
        <h3> Подключенные пользователи</h3>
        <code>Подключение к сокету: {isConnected ? "true" : "false"}</code>
        <br />
        <code>Подключенные пользователи: {joined} joined.keys().toArray() IS NOT A FUNCTION)))))))) XDDDD</code>
        <br />
        <code>{bark}</code>
        <br />
        <button onClick={() => messageToAllTest()}>bark on ALL</button>
        <button onClick={() => messageToRoomTest()}>bark in ROOM</button>
        <button onClick={() => messageToSingleRoomTest()}>bark in BAAA</button>
    </div>
  )
}

export default GameRoom