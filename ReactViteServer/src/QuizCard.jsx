/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaRegPlayCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdEditNote } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const QuizCard = ({quiz, ind, passUp}) => {
    const navigate = useNavigate();
    const [active, setActive] = useState(false)

    const deleter = () => {
        passUp(ind)
    }

  return (
    <div className="card pointer relative" onMouseOver={() => setActive(true)} onMouseOut={() => setActive(false)}>
        <h2>{quiz.title}</h2>
        <div>
            <button className='absolute_tr beige svg unset_hover pointer' style={ active ? {} : {visibility: "hidden"}} onClick={() => {deleter()}}><IoMdClose className="svg"/></button>
            <button className='absolute_tl beige unset_hover pointer' style={ active ? {} : {visibility: "hidden"}}
                onClick={() => {navigate('/editor', { state: {question: quiz.questions, index: ind}});}}
            ><MdEditNote className="svg"/></button>
            <button className='icon absolute_bc unset unset_hover' style={ active ? {} : {visibility: "hidden"}} onClick={() => {
                navigate('/play', {state: {quiz: quiz, ind: ind}})}
            }><FaRegPlayCircle className="svg"/></button>
        </div>
    </div>
  )
}

export default QuizCard