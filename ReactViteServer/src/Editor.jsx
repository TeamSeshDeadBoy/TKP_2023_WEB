// import { useLoaderData } from "react-router-dom"
import QuestionEdit from './CreatorComponents/QuestionEdit.jsx'
import { useState } from "react";
import QuestionWrapper from './CreatorComponents/QuestionWrapper.jsx';
import { useLocation, useNavigate } from 'react-router-dom';

const Editor = () => {
  let tempd = [{"text":"Test question #1","answers":[{"text":"true"},{"text":"false"}],"validIndex":0},{"text":"Test question #2","answers":[{"text":"false"},{"text":"true"}],"validIndex":1},{"text":"Test question #3","answers":[{"text":"false"},{"text":"false"},{"text":"true"}],"validIndex":2},{"text":"Test question #4","answers":[{"text":"false"},{"text":"false"},{"text":"false"},{"text":"true"}],"validIndex":3}]
  const {state} = useLocation(); // {}
  let question, index
  
  
  const [error, setError] = useState(false);
  const [nameVar, setName] = useState("");
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
      }
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

  return (
  <>
        {/* <h1>{state ? `РЕДАКТОР ВИКТОРИНЫ` : "СОЗДАНИЕ ВИКТОРИНЫ" }</h1> */}
        <input placeholder='ВИКТОРИНА' type="text" onChange={(e) => setName(e.target.value)}></input>
    <div className='flex_row relative'>
          <div className="questionedit">
            <QuestionEdit childToParent={childToParent} data={data}/>
            {error ? <div className='errortext'>ПРОВЕРЬТЕ: ИМЯ ВИКТОРИНЫ, ВОПРОСЫ</div> : ""}
          </div>
            <QuestionWrapper data={data} key={data} change={changeFromChild}/>
            <button type="button" className='a_to_normal absolute_br blue' onClick={() => save()}>СОХРАНИТЬ ВИКТОРИНУ</button>
    </div>
  </>
  )
}

export default Editor