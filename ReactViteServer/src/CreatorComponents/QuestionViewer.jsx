/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {useState} from 'react'
import EditingQuestion from "./EditingQuestion";
import { IoMdClose } from "react-icons/io";
import { MdEditNote } from "react-icons/md";

const QuestionViewer = ({ind, data, deleteQuestion, passQuestion}) => {
    // const [valid, setvalid] = useState(0)
    const [isEditing, setIsEditing] = useState(false)
    const [active, setActive] = useState(false)
    // useEffect(() => {
    //   setvalid(data.validIndex)
    // }, [])
    
    // const renderButtons = () => {
    //     const buttons = [];
    //     for (let i = 0; i < data.answers.length; i++) {
    //       buttons.push(
    //         <div key={i}>
    //             <p style={{background: i == valid ? "#afff87" : "", color: i== valid? "#242424" : ""}} className="answer_tag">{data.answers[i].text}</p>
    //         </div>
    //       );
    //     }
    //     return buttons;
    //   }

    const collectData = (childquestion, i) => {
      console.log(childquestion)
      setIsEditing(false)
      passQuestion(childquestion, i) 
    }

  return (
    <div className="card pointer relative" onMouseOver={() => setActive(true)} onMouseOut={() => setActive(false)}>
      {isEditing ? <EditingQuestion question={data} dataToParent={collectData} ind={ind}/> : <>
          <p style={{fontSize: "26px"}}>ВОПРОС {ind}</p>
          {/* <p>Правильный ответ: {valid + 1}</p> */}
          <div className='btns_cntainer'>
            <button id="1111" className='absolute_tr beige svg unset_hover pointer' onClick={() => {deleteQuestion(ind)}} style={ active ? {} : {visibility: "hidden"}}><IoMdClose className="svg"/></button>
            <button id="2222" className='absolute_tl beige unset_hover pointer' onClick={() => setIsEditing(true)} style={ active ? {} : {visibility: "hidden"}}><MdEditNote className="svg"/></button>
          </div>
          <p>{data.text}</p>
          <div className='buttons'>
              {/* {renderButtons()} */}
          </div>
        </>}
    </div>
  )
}

export default QuestionViewer