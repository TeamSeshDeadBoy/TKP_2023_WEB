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
            <div key={i}>
                <input autoFocus name="textarea" key={answers[i].text} value={answers[i].text} onChange={(e) => setAnsw(e.target.value, i)}/>
                <button style={{background: valid == i ? "green" : ""}} onClick={() => setValid(i)}>{i + 1}</button>
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
        temp[ind] = {text: text, valid: false}
        setAnswers(temp)
    }


  return (
    <div>
        {questionText}
        {JSON.stringify(answers)}
        {valid}
        <textarea id="noter-text-area" name="textarea" value={questionText} onChange={(e) => setQuestionText(e.target.value)}/>
        {renderAnswers()}
        {error ? <div className="errortext">Заполните все поля !</div> : ''}
        <button type="button" onClick={() => {error ? " " : dataToParent(collectData(), ind)}}>Сохранить</button>
    </div>
  )
}

export default EditingQuestion