/* eslint-disable react/prop-types */
import './QuizCard.css'
import { FaPlay } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { socket } from './socket.js';

const QuizCard = ({quiz, ind, passUp}) => {
    const navigate = useNavigate();

    const deleter = () => {
        passUp(ind)
    }

  return (
    <div className="card_wrapper">
        <h2>{quiz.title}</h2>
        <p>Вопросов: {quiz.questions.length}</p>
        <div className='button_wrapper'>
            <button className='card_button' onClick={() => {deleter()}}><MdDelete className='icon' /></button>
            <button className='card_button' 
                onClick={() => {navigate('/editor', { state: {question: quiz.questions, index: ind}});}}
            ><FaEdit className='icon'/></button>
            <button className='card_button' onClick={() => {
                socket.emit('join', {roomId: localStorage.getItem('userId')})
                navigate('/play', {state: {quiz: quiz, ind: ind}})}
            }><FaPlay className='icon'/></button>
        </div>
    </div>
  )
}

export default QuizCard