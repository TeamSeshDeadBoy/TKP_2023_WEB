import { useLocation } from "react-router-dom";
import { socket } from './socket';
import bg_w from '/src/bg_w.png';
import bg_b from '/src/bg_b.png';
import Lobby from "./Lobby";
import { useEffect, useState } from "react";


const SockerWrapper = () => {
    const [start, setStart] = useState(false)
    const getStartFlag = (bool) => {
        setStart(bool)
    }

    const {state} = useLocation();
    const { quiz } = state;
    const userId = localStorage.getItem('userId')
    const userName = localStorage.getItem('userName')
    const black_bg = {
        backgroundImage: `url(${bg_b})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh'
      }
      const white_bg = {
        backgroundImage: `url(${bg_w})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh'
      }



    useEffect(() => {
        socket.connect();
        socket.emit('create', {id: userId, quiz: JSON.stringify(quiz), userName: userName})

        socket.on('join', (obj) => {console.log(obj)});
        socket.on('bark', (obj) => {console.log(obj)});

    
        return () => {
          socket.off();
          socket.disconnect();
        };
      }, []);



  return (
    <div style={black_bg}className="flex_center">
        {start}
        <div className="timer">ВИКТОРИНА {quiz.title.toUpperCase()}</div>
        <Lobby users={[1,2,3,4,3,3,3,]} passStartFlag={getStartFlag}/>
    </div>
  )
}

export default SockerWrapper