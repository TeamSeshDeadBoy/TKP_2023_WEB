/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom"


const Rooms = () => {
  const navigate = useNavigate();
  const [UID, setUID] = useState(localStorage.getItem('userId'))
  const [quizzes, setQuizzes] = useState(localStorage.getItem('userQuizzes'))
  const [error, setError] = useState(false)

  const delAccount = () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('userQuizzes')
    axios.post('http://localhost:3000/deleteUser', {id: UID,}).then((response) => { console.log(response)
      navigate("/")}).catch((error) => {console.log(error.response.data.msg)})
    navigate("/")
  }

  
  return (
    <>
      <div>Room list for {UID}</div>
      <div>List{quizzes}</div>
      {error}
      <button className="button" onClick = {() => delAccount()}>Удалить свой аккаунт</button>
      <a href="/editor" className='button'>Создать новую викторину</a>
    </>
  )
}

export default Rooms