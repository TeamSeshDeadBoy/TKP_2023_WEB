/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";


const EditingQuestion = ({question, dataToParent, ind}) => {
    const [valid, setValid] = useState(question.validIndex)
    const [questionText, setQuestionText] = useState(question.text)
    const [error, setError] = useState(false)
    let [answers, setAnswers] = useState(question.answers)
    useEffect(() => {
      if (questionText.length == 0 && checkAnsw()) 
        {setError(true)}
    }, [])

    function checkAnsw() {
        let flagg = false
        for (let i = 0; i < question.answers.length; i++) {
            if (answers[i].text.length == 0){flagg = true}
        }
        return flagg
    }
    
    const renderAnswers = () => {
        const buttons = [];
        for (let i = 0; i < question.answers.length; i++) {
          buttons.push(
            <div key={i} className="flex_row">
                <input autoFocus name="textarea" key={answers[i].text} value={answers[i].text} onChange={(e) => setAnsw(e.target.value, i)} className="small_input"/>
                <button style={{background: valid == i ? "#D6BF81" : ""}} onClick={() => setValid(i)} className="small"></button>
            </div>
          );
        }
        return buttons;
      }

    const collectData = () => {
        if (questionText.length > 0){
          setError(false)
          return {text: questionText, answers: answers, validIndex: valid}
        }
        else {
            setError(true)
            return {}
        }
    }

    const setAnsw = (text, ind) => {
        let temp = structuredClone(answers)
        temp[ind] = {text: text}
        setAnswers(temp)
    }


  return (
    <div className="pointer relative">
        <textarea id="noter-text-area" className="small_textarea" name="textarea" value={questionText} onChange={(e) => setQuestionText(e.target.value)}/>
        <div className="constraint">{renderAnswers()}
          <button type="button" className="small_a_to_normal" onClick={() => {error ? " " : dataToParent(collectData(), ind)}}>Сохранить</button>
        </div>
        {error ? <div className="errortext">Заполните все поля !</div> : ''}
    </div>
  )
}

export default EditingQuestion