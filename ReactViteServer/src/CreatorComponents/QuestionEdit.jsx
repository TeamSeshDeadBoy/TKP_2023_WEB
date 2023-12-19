/* eslint-disable react/prop-types */
import {useEffect, useState} from 'react'

const QuestionEdit = ({data, childToParent, saveState}) => {
    const [cntAnsw, setCntAnsw] = useState(2)
    const [questionText, setQuestionText] = useState('')
    const [valid, setValid] = useState(1)
    const [error, setError] = useState(false)
    let [answers, setAnswers] = useState([{}, {}, {}, {}])
    const [cnt, setCnt] = useState(data.length)

    function setAnsw(text, ind) {
        answers[ind - 1] = {text: text}
        setAnswers(answers)
        setVld(1)
    }

    useEffect(() => {
      childToParent(collectData())
    }, [saveState])
    

    function setVld(ind) {
        setValid(ind)
    }

    const renderButtons = () => {
        const buttons = [];
        for (let i = 1; i <= cntAnsw; i++) {
          buttons.push(
            <div key={i} className="flex_row">
                <input placeholder="ВАРИАНТ ОТВЕТА" name={`Answer${i}`} onChange={(e) => setAnsw(e.target.value, i)} className='long_input'/>
                <button style = {{backgroundColor: valid == i ? '#D6BF81' : ''}} onClick = {() => setVld(i)} type='button' className="small"></button>
            </div>
          );
        }
        return buttons;
      }

    const checkAnswers = () => {
        let flag = true
        for (let i = 0; i < cntAnsw; i++){
            if (!answers[i].text){
                return false
            }
        }
        return flag
    }
    
    const collectData = () => {
        answers = answers.filter(value => Object.keys(value).length !== 0)
        answers = answers.slice(0, cntAnsw)
        if (questionText.length > 0 && checkAnswers()){
          setError(false)
          return {text: questionText, answers: answers, validIndex: valid-1}
        }
        else {setError(true)}
    }

  return (
    <div className='adder relative'>
      <p className='text_question unset space_bottom'>ДОБАВИТЬ ВОПРОС</p>
        <form className='form'>
            <input placeholder='ТЕКСТ ВОПРОСА' className='long_input' name="text"  onChange={(e) => setQuestionText(e.target.value)}/>
                {renderButtons()}
             {error ? <div className="errortext">Заполните все поля !</div> : ''}
            <div className='counter'>
                <button type="button" className=' unset counter_button'
                 onClick = {() => {cntAnsw == 4 ? setCntAnsw(cntAnsw) : setCntAnsw(cntAnsw + 1)}}
                >+</button>
                <button type="button" className='unset counter_button'
                 onClick = {() => {cntAnsw == 2 ? setCntAnsw(cntAnsw) : setCntAnsw(cntAnsw - 1)}}
                >-</button>
             </div>
            <button type="button" className='width_to_fit'
            onClick={() => childToParent(collectData())}
            >Добавить вопрос</button>
        </form>
    </div>
  )
}

export default QuestionEdit