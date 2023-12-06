/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {useEffect, useState} from 'react'
import './QuestionViewer.css'

const QuestionViewer = ({ind, data}) => {
    const [valid, setvalid] = useState(0)
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

  return (
    <div className='question_view'>
        <p>Вопрос №{ind}</p>
        <p>{data.text}</p>
        <div className='buttons'>
            {renderButtons()}
        </div>
    </div>
  )
}

export default QuestionViewer