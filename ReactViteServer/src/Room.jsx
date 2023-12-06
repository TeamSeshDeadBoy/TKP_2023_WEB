import { useLoaderData } from "react-router-dom"
import './Room.css'
import QuestionEdit from './CreatorComponents/QuestionEdit.jsx'
import { useState } from "react";
import QuestionViewer from './CreatorComponents/QuestionViewer.jsx'

const Room = () => {
    const roomID = useLoaderData().data.id;
    
    const [data, setData] = useState('');

    const childToParent = (childdata) => {
      if (childdata) { 
        setData([...data, childdata]);
      }
    }

    function renderQuestions() {
      const questions = []
      for (let i = 0; i < data.length; i++) {
        questions.push(<QuestionViewer ind={i + 1} data={data[i]}/>)
      }
      return questions
    }

  return (
  <>
    <div className="room">
        <h2>Создайте новую викторину</h2>
        <code>{JSON.stringify(data)}</code>
        <p>roomID: {roomID}</p>
        <div className='main'>
          <div className="questions">
              {renderQuestions()}
          </div>
          <div className="questionedit">
          <QuestionEdit childToParent={childToParent}/>
          </div>
        </div>
    </div>
  </>
  )
}

export default Room