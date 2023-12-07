/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { FaTrash } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";
import {useEffect, useState} from 'react'
import './QuestionViewer.css'

const QuestionViewer = ({ind, data, deleteQuestion}) => {
    const [valid, setvalid] = useState(0)
    useEffect(() => {
      console.log("setting validity")
      setvalid(data.validIndex)
    }, [])
    
    const renderButtons = () => {
        const buttons = [];
        for (let i = 0; i < data.answers.length; i++) {
          buttons.push(
            <div key={i}>
                <p style={{background: i == valid ? "green" : ""}}>{data.answers[i].text}</p>
            </div>
          );
        }
        return buttons;
      }

  return (
    <div className='question_view'>
        <p>Вопрос №{ind}</p>
        <p>Правильный ответ: {valid + 1}</p>
        <div className='btns_cntainer'>
          <button id="1111" className='del_btn' onClick={() => {deleteQuestion(ind)}}><FaTrash className="icon"/></button>
          <button id="2222" className='edit_btn'><TiPencil className="icon"/></button>
        </div>
        <p>{data.text}</p>
        <div className='buttons'>
            {renderButtons()}
        </div>
    </div>
  )
}

export default QuestionViewer