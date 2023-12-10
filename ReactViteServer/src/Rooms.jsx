/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import './Rooms.css'
import QuizCard from "./QuizCard";


const Rooms = () => {
  const navigate = useNavigate();
  const [UID, setUID] = useState(localStorage.getItem('userId'))
  const [quizzes, setQuizzes] = useState(JSON.parse(localStorage.getItem('userQuizzes')))
  const [parsed, setParsed] = useState([])
  const [error, setError] = useState(false)

  const delAccount = () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('userQuizzes')
    axios.post('http://localhost:3000/deleteUser', {id: UID,}).then((response) => { console.log(response)
      navigate("/")}).catch((error) => {console.log(error.response.data.msg)})
    navigate("/")
  }

  const logOut = () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('userQuizzes')
    navigate("/")
  }

  const getIndToDelete = (ind) => {
    console.log(ind)
    let temp = quizzes 
    temp.splice(ind, 1)
    localStorage.setItem('userQuizzes', JSON.stringify(temp))
    setQuizzes(JSON.parse(localStorage.getItem('userQuizzes')))
  }

  const renderCards = () => {
    let temp = []
        for (let i = 0; i < quizzes.length; i++) {
          temp.push(<QuizCard key={quizzes[i].title} quiz={quizzes[i]} ind={i} passUp={getIndToDelete}/>)
        }
        setParsed(temp)
  }

  useEffect(() => {
    renderCards()
    axios.post('http://localhost:3000/usersQuizzes', {userId: localStorage.getItem('userId'), quizzes: quizzes}).then((response) => console.log(response))
  }, [quizzes])
  

  
  return (
    <>
      <div>Room list for {UID}</div>
      {error}
      <div className="wrapper_cards">
        {parsed}
      </div>
      <div className="buttons_wrapper">
        <button className="button_log" onClick = {() => logOut()}>Выйти из аккаунта</button>
        <button className="button_del" onClick = {() => delAccount()}>Удалить свой аккаунт</button>
      </div>
      <a href="/editor" className='button'>Создать новую викторину</a>
    </>
  )
}

export default Rooms