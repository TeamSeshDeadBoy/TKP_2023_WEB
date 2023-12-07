/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { FaTrash } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";
import {useEffect, useState} from 'react'
import './QuestionViewer.css'
import EditingQuestion from "./EditingQuestion";

const QuestionViewer = ({ind, data, deleteQuestion, passQuestion}) => {
    const [valid, setvalid] = useState(0)
    const [isEditing, setIsEditing] = useState(false)
    useEffect(() => {
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

    const collectData = (childquestion, i) => {
      console.log(childquestion)
      setIsEditing(false)
      passQuestion(childquestion, i) 
    }

  return (
    <div className='question_view'>
      {isEditing ? <EditingQuestion question={data} dataToParent={collectData} ind={ind}/> : <>
          <p>Вопрос №{ind}</p>
          <p>Правильный ответ: {valid + 1}</p>
          <div className='btns_cntainer'>
            <button id="1111" className='del_btn' onClick={() => {deleteQuestion(ind)}}><FaTrash className="icon"/></button>
            <button id="2222" className='edit_btn' onClick={() => setIsEditing(true)}><TiPencil className="icon"/></button>
          </div>
          <p>{data.text}</p>
          <div className='buttons'>
              {renderButtons()}
          </div>
        </>}
    </div>
  )
}

export default QuestionViewer