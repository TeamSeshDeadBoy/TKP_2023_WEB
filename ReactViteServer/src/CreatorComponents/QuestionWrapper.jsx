/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import QuestionViewer from "./QuestionViewer"
import './QuestionWrapper.css'


const QuestionWrapper = ({data, change}) => {
    const [questions, setQuestions] = useState(data)
    const [components, setComponents] = useState([])

    const deleteQuestion = (ind) => {
        if (ind) {
          console.log("deleting", ind - 1)
        }
        setQuestions([...questions.slice(0, ind -1), ...questions.slice(ind)]);
      }


    function renderQuestions() {
        console.log("rerendering data array")
        let temp = []
        for (let i = 0; i < questions.length; i++) {
          temp.push(<QuestionViewer key={questions[i].text} ind={i + 1} data={questions[i]} deleteQuestion={deleteQuestion}/>)
        }
        setComponents(temp)
      }

    useEffect(() => {
        renderQuestions()
        change(questions)
    }, [questions])
    

  return (
    <div>
        <div className="questions">{components}</div>
    </div>
  )
}

export default QuestionWrapper