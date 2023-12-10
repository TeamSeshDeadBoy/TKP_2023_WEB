// import { useLoaderData } from "react-router-dom"
import './Editor.css'
import QuestionEdit from './CreatorComponents/QuestionEdit.jsx'
import { useState } from "react";
import QuestionWrapper from './CreatorComponents/QuestionWrapper.jsx';

const Editor = () => {
    const tempd = [{"text":"Test question #1","answers":[{"text":"true"},{"text":"false"}],"validIndex":0},{"text":"Test question #2","answers":[{"text":"false"},{"text":"true"}],"validIndex":1},{"text":"Test question #3","answers":[{"text":"false"},{"text":"false"},{"text":"true"}],"validIndex":2},{"text":"Test question #4","answers":[{"text":"false"},{"text":"false"},{"text":"false"},{"text":"true"}],"validIndex":3}]
    
    const [data, setData] = useState(tempd);
    const [error, setError] = useState(false);
    const [nameVar, setName] = useState("");

    const childToParent = (childdata) => {
      if (childdata) { 
        setData([...data, childdata]);
      }
    }

    const changeFromChild = (childdata) => {
      console.log('changing from child')
      setData([...childdata]);
    };


  const save = () => {
    if (data.length == 0 || !nameVar) {setError(true)}
    else {setError(false)
    let quizzes = localStorage.getItem('userQuizzes');
    if (quizzes.length == 0) {
      quizzes.append({title: nameVar, questions: data})
      localStorage.setItem('userQuizzes', [JSON.stringify({title: nameVar, questions: data})]);
    } else{
      localStorage.setItem('userQuizzes', [JSON.stringify({title: nameVar, questions: data})]);
    }
    }
  }

  return (
  <>
    <div className="room">
        <h2>Создайте новую викторину</h2>
        <code>{JSON.stringify(data)}</code>
        <div className='main'>
          <div className="questions">
            <QuestionWrapper data={data} key={data} change={changeFromChild}/>
          </div>
          <div className="questionedit">
            <QuestionEdit childToParent={childToParent}/>
            <p className='textName'>Введите название викторины:</p>
            <input type="text" onChange={(e) => setName(e.target.value)}></input>
            {error ? <div className='error_text'>Сначала заполните имя викторины, или увеличьте число вопросов (минимум - 2)</div> : ""}
            <button type="button" className='button_save' onClick={() => save()}>Сохранить викторину</button>
          </div>
        </div>
    </div>
  </>
  )
}

export default Editor