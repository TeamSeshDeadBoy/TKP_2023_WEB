import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [userID, setUserID] = useState(null)
  useEffect(() => {
    let tempId = localStorage.getItem('userId')
    if (tempId){
      setUserID(tempId)
    } else {
      localStorage.setItem('userId', "AAAAAA");
    }
  }, [])
  

  return (
    <>
      <h1>Рубильник</h1>
      <div className="card">
        <a className='button' href="/rooms">
          Выбрать из созданных вами викторин
        </a>
        <a className='button' href="/editor">
          Создать новую викторину
        </a>
      </div>
      <div className='footer'>
        Создано Монаховым Артемом, Лебедевым Степаном и Рыбалко Константином в рамках курсового проекта МосПолитеха 5 семестра в 2023 году.
      </div>
    </>
  )
}

export default App
