/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import { FiEdit } from "react-icons/fi";
import { CgCloseR } from "react-icons/cg";
import { IoPlayOutline } from "react-icons/io5";

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
            <button className='absolute_tr beige svg unset_hover pointer add_hover_size reposizion_r' style={ active ? {} : {visibility: "hidden"}} onClick={() => {deleter()}}><CgCloseR className="svg"/></button>
            <button className='absolute_tl half beige unset_hover pointer add_hover_size reposizion_l' style={ active ? {} : {visibility: "hidden"}}
                onClick={() => {navigate('/editor', { state: {question: quiz.questions, index: ind}});}}
            ><FiEdit className="svg"/></button>
            <button className='absolute_bc unset unset_hover add_hover_size_big reposizion_c' style={ active ? {} : {visibility: "hidden"}} onClick={() => {
                navigate('/play', {state: {quiz: quiz, ind: ind}})}
            }><IoPlayOutline className="svg2"/></button>
        </div>
    </div>
  )
}

export default QuizCard