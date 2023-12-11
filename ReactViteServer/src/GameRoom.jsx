/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useLocation } from "react-router-dom";
import { socket } from './socket';
import { useEffect, useState } from "react";
// import './GameRoom.css'


const GameRoom = () => {
    const {state} = useLocation();
    const { quiz, ind } = state;

    const UID = localStorage.getItem('userId')
    const userName = localStorage.getItem('userName')

    const [isConnected, setIsConnected] = useState(socket.connected);
    const [joined, setJoined] = useState([]);
    const [message, setMessage] = useState("");

    const joinTest = () => {
      console.log("pressing msg")
      socket.emit('message', {userName: userName, message: "woof"})
    }

    useEffect(() => {
        socket.connect();
        socket.emit('join', {roomId: localStorage.getItem('userId'), userName: localStorage.getItem('userName')})

        function onConnect() {
          setIsConnected(true);
        }
    
        function onDisconnect() {
          setIsConnected(false);
        }
    
        function onJoinEvent(value) {
            if (value.roomId == UID) {
                setJoined([...joined, value.userName]);
            }
        }

        function onMsgEvent(value) {
          setMessage(value.msg)
        }

        function onMessageEvent(value) {
          console.log(value)
        }
    
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('join', onJoinEvent);
        socket.on('message', onMessageEvent);
        socket.on('msg', (msg) => {console.log("r"); setMessage(msg.msg)});
    
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
        <code>Подключенные пользователи: {joined}</code>
        <br />
        <button onClick={() => joinTest()}>join</button>
    </div>
  )
}

export default GameRoom