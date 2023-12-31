/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import QuestionViewer from "./QuestionViewer"


const QuestionWrapper = ({data, change, trigger}) => {
    const [questions, setQuestions] = useState(data)
    const [components, setComponents] = useState([])

    const deleteQuestion = (ind) => {
        setQuestions([...questions.slice(0, ind -1), ...questions.slice(ind)]);
      }

    const changeQuestion = (childdata, ind) => {
      let temp = structuredClone(questions)
      temp[ind - 1] = childdata
      setQuestions(temp)
    }


    function renderQuestions() {
        let temp = []
        for (let i = 0; i < questions.length; i++) {
          temp.push(<QuestionViewer key={questions[i].text + questions[i].validIndex} ind={i + 1} data={questions[i]} deleteQuestion={deleteQuestion} passQuestion={changeQuestion}/>)
        }
        setComponents(temp)
      }

    useEffect(() => {
        renderQuestions()
        change(questions)
    }, [questions])
    

  return (
    <div className="questions grid">{components}
    {/* <div className="button_plus_container">
      <button type="button" className='button_plus pointer'
              onClick={() => trigger(true)}
              >+</button>
    </div> */}
    </div>
  )
}

export default QuestionWrapper