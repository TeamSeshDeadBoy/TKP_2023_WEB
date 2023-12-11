import { useLocation } from "react-router-dom";
import { socket } from './socket';
import { useEffect, useState } from "react";


const GameRoom = () => {
    const {state} = useLocation();
    const { quiz, ind } = state;

    const UID = localStorage.getItem('userId')

    const [isConnected, setIsConnected] = useState(socket.connected);
    const [joined, setJoined] = useState([]);

    useEffect(() => {
        socket.connect();
        function onConnect() {
          setIsConnected(true);
        }
    
        function onDisconnect() {
          setIsConnected(false);
        }
    
        function onJoinEvent(value) {
            if (value.roomId == UID) {
                setJoined(previous => [...previous, value.userName]);
            }
        }
    
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('join', onJoinEvent);
    
        return () => {
          socket.off('connect', onConnect);
          socket.off('disconnect', onDisconnect);
          socket.off('join', onJoinEvent);
          socket.disconnect();
        };
      }, []);
    
  return (
    <div>
        <h2>Комната викторины &ldquo;{quiz.title}&rdquo;</h2>
        <h3> Подключенные пользователи</h3>
        <code>Подключение к сокету: {isConnected ? "true" : "false"}</code>
        <br />
        <code>Подключенные пользователи: {joined}</code>
        <br />
        <button onClick={() => socket.emit('join', {roomId: localStorage.getItem('userId')})}>join</button>
    </div>
  )
}

export default GameRoom