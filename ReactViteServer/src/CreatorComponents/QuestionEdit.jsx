/* eslint-disable react/prop-types */
import {useState} from 'react'

const QuestionEdit = ({childToParent}) => {
    const [cntAnsw, setCntAnsw] = useState(2)
    const [questionText, setQuestionText] = useState('')
    const [valid, setValid] = useState(1)
    const [error, setError] = useState(false)
    let [answers, setAnswers] = useState([{}, {}, {}, {}])

    function setAnsw(text, ind) {
        answers[ind - 1] = {text: text}
        setAnswers(answers)
        setVld(1)
    }

    function setVld(ind) {
        setValid(ind)
    }

    const renderButtons = () => {
        const buttons = [];
        for (let i = 1; i <= cntAnsw; i++) {
          buttons.push(
            <div key={i}>
                <label>Вариант ответа № {i}:</label>
                <input name={`Answer${i}`} onChange={(e) => setAnsw(e.target.value, i)}/>
            </div>
          );
        }
        return buttons;
      }

      const renderToggle = () => {
        const buttons = [];
        for (let i = 1; i <= cntAnsw; i++) {
          buttons.push(
            <div key={i}>
                <button style = {{backgroundColor: valid == i ? 'green' : ''}} onClick = {() => setVld(i)} type='button'>{i}</button>
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
    <div className='question'>
        <p>Конструктор Вопроса</p>
        <form className='form'>
            <label>Текст вопроса: </label>
            <textarea name="text"  onChange={(e) => setQuestionText(e.target.value)}/>
            <div className='counter'>
                <button type="button" className='counter_button'
                 onClick = {() => {cntAnsw == 4 ? setCntAnsw(cntAnsw) : setCntAnsw(cntAnsw + 1)}}
                >+</button>
                <p className='counter_p'>{cntAnsw}</p>
                <button type="button" className='counter_button'
                 onClick = {() => {cntAnsw == 2 ? setCntAnsw(cntAnsw) : setCntAnsw(cntAnsw - 1)}}
                >-</button>
             </div>
                {renderButtons()}
             <div className='buttons_'>
                {renderToggle()}
             </div>
             {error ? <div className="errortext">Заполните все поля !</div> : ''}
            <button type="button"
            onClick={() => childToParent(collectData())}
            >Добавить вопрос</button>
        </form>
    </div>
  )
}

export default QuestionEdit