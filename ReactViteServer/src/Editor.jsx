// import { useLoaderData } from "react-router-dom"
import QuestionEdit from './CreatorComponents/QuestionEdit.jsx'
import { useState } from "react";
import QuestionWrapper from './CreatorComponents/QuestionWrapper.jsx';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Editor = () => {
  let tempd = [{"text":"Назовите столицу Франции","answers":[{"text":"Париж"},{"text":"Токио"}, {"text":"Москва"}],"validIndex":0},{"text":"Чему равно 2+2 ?","answers":[{"text":"четыре"},{"text":"four"},{"text":"4"}, {"text":"Все перечисленное выше"}],"validIndex":3},{"text":"Сколько лучше варить яйцо вкрутую?","answers":[{"text":"0 мин"},{"text":"15 секунд"},{"text":"6 минут"},{"text":"4 недели"}],"validIndex":2},{"text":"Какую оценку вы хотите получить за крусовую работу?","answers":[{"text":"2"},{"text":"3"},{"text":"4"},{"text":"5"}],"validIndex":3}]
  const {state} = useLocation(); // {}
  let question, index
  
  
  const [error, setError] = useState(false);
  const [nameVar, setName] = useState("БЕЗ НАЗВАНИЯ");
  if (state) {
    question = state.question
    index = state.index
    tempd = question
  }
  const [data, setData] = useState(tempd);
    const navigate = useNavigate();

    const childToParent = (childdata) => {
      if (childdata) { 
        setData([...data, childdata]);
        setSavePus(false)
      }
      setSavePus(false)
    }

    const changeFromChild = (childdata) => {
      setData([...childdata]);
    };


  const save = () => {
    if (data.length == 0 || !nameVar) {setError(true)}
    else {setError(false)
      if (state) {
        let quizzes = JSON.parse(localStorage.getItem('userQuizzes'));
        quizzes[index] = {title: nameVar, questions: data}
        localStorage.setItem('userQuizzes', JSON.stringify(quizzes));
        navigate("/rooms")
      } else {
        let quizzes = JSON.parse(localStorage.getItem('userQuizzes'));
        if (quizzes) {
          quizzes.push({title: nameVar, questions: data})
          localStorage.setItem('userQuizzes', JSON.stringify(quizzes));
          navigate("/rooms")
        } else{
          localStorage.setItem('userQuizzes', [JSON.stringify({title: nameVar, questions: data})]);
          navigate("/rooms")
        }
      }
    }
  }

  const [savePus, setSavePus] = useState(false)

  const savePushed = (bool) => {
    setSavePus(bool)
  }

  return (
  <>
      <h1 className="logo_corner pointer" onClick={() => navigate('/rooms')}>РУБИЛЬ<span style={{color: "#D6BF81"}}>НИК</span></h1>
        <input placeholder='НАЗВАНИЕ' value={nameVar} type="text" onChange={(e) => setName(e.target.value)} onClick={() => {nameVar == "БЕЗ НАЗВАНИЯ" ? setName("") : ""}}></input>
    <div className='flex_row relative'>
          <div className="questionedit">
            <QuestionEdit childToParent={childToParent} data={data} saveState={savePus}/>
            {error ? <div className='errortext'>ПРОВЕРЬТЕ: ИМЯ ВИКТОРИНЫ, ВОПРОСЫ</div> : ""}
          </div>
            <QuestionWrapper data={data} key={data} change={changeFromChild} trigger={savePushed} />
            <button type="button" className='a_to_normal absolute_br blue' onClick={() => save()}>СОХРАНИТЬ ВИКТОРИНУ</button>
    </div>
    <div className='footer'>СОЗДАНО РЫБАЛКО К., ЛЕБЕДЕВЫМ С., МОНАХОВЫМ А.</div>
  </>
  )
}

export default Editor