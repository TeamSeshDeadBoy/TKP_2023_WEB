/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation } from "react-router-dom";
import { socket } from './socket';
import bg_w from '/src/bg_w.png';
import bg_b from '/src/bg_b.png';
import Lobby from "./Lobby";
import { useEffect, useState } from "react";
import Game from "./Game";
import Endgame from "./Endgame";


const SockerWrapper = () => {
    const userId = localStorage.getItem('userId')
    const userName = localStorage.getItem('userName')
    const {state} = useLocation();
    const { quiz } = state;

    let result_placeholder = []
    for (let i = 0; i < quiz.questions.length; i++) {
        result_placeholder.push({correct: quiz.questions[i].validIndex, answers: []})
    }
    const [answerLog, setAnswerLog] = useState(result_placeholder)

    const [start, setStart] = useState(false)
    const getStartFlag = (bool) => {
        setStart(bool)
        setCurrIndex(0)
    }
    const [end, setEnd] = useState(false)

    const [connected, setConnect] = useState([{userId: userId, userName: "ВЫ"}])
    const [currIndex, setCurrIndex] = useState(-1)
    const next = (bool) => {
        if (bool && currIndex < quiz.questions.length - 1) {
            setCurrIndex(currIndex + 1)
        } else if (currIndex == quiz.questions.length - 1) {
            setEnd(true)
            socket.emit('end', {roomId: userId})
        }
    }

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
        if (currIndex !== -1) {
            socket.emit('next', {roomId: userId}) 
        }
      }, [currIndex])
      


    useEffect(() => {
        socket.connect();
        socket.emit('create', {id: userId, quiz: JSON.stringify(quiz), userName: userName})

        function onJoin(obj) {
            console.log(obj)
            setConnect(oldArray => [...oldArray,obj]);
          }
        socket.on('join', onJoin);


        function onChoice(obj) {
            console.log(obj)
            let temp = structuredClone(answerLog)
            temp[obj.questionInd].answers.push({userId: obj.userId, choice: obj.choiceInd})
            setAnswerLog(temp)
          }
        socket.on('choice', onChoice);


        socket.on('bark', (obj) => {console.log(obj)});

    
        return () => {
          socket.off();
          socket.disconnect();
        };
      }, []);




  return (
    <div style={start ? end ? {} : white_bg : black_bg} className="flex_center">
        <div className={ start ? end ? "timer_b" : "timer_w space_top_timer":"timer_b"}>ВИКТОРИНА {quiz.title.toUpperCase()}</div>
        {start ?  end ? <Endgame /> : <Game answers={quiz.questions[currIndex]} passNext={next}/> : <Lobby users={connected} passStartFlag={getStartFlag}/>}
        <h1 className="debug_string">{JSON.stringify(answerLog)}</h1>
    </div>
  )
}

export default SockerWrapper