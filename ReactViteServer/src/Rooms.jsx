import { useState } from "react"


const Rooms = () => {
  const [UID, setUID] = useState(localStorage.getItem('userId'))
  const [quizzes, setQuizzes] = useState(localStorage.getItem('userQuizzes'))
  
  return (
    <>
      <div>Room list for {UID}</div>
      <div>List{quizzes}</div>
      <a href="/editor" className='button'>Создать новую викторину</a>
    </>
  )
}

export default Rooms