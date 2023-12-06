import { useEffect, useState } from 'react'
import axios from "axios";
import { redirect} from "react-router-dom";
import './App.css'

function App() {
  const [roomID, setroomID] = useState(null)
  useEffect(() => {
    redirect('/room')
  }, [roomID])
  

  return (
    <>
      <h1>Рубильник</h1>
      <div className="card">
        <a className='button' href="/room"
          onClick={() =>  axios.post('http://localhost:3000/getRooms', {
            id: '####'
          }).then(function (response) {setroomID(response)}).catch(function (error) {console.log(JSON.stringify(error));})}
        >
          Присоединиться к существующей викторине
        </a>
        <a className='button' href="/room"
          onClick={() =>  axios.post('http://localhost:3000/createRoom', {
            id: '####'
          }).then(function (response) {setroomID(response.data.id)}).catch(function (error) {console.log(JSON.stringify(error));})}
        >
          Создать новую викторину
        </a>
      </div>
      <p>{roomID}</p>
      <div className='footer'>
        Создано Монаховым Артемом, Лебедевым Степаном и Рыбалко Константином в рамках курсового проекта МосПолитеха 5 семестра в 2023 году.
      </div>
    </>
  )
}

export default App
