import { useState } from 'react'
import axios from "axios";
import './Debug.css'

function Debug() {
  const [response, setResponse] = useState('Debug console log')

  return (
    <>
      <h1>Рубильник</h1>
      <div className="card">
        <button onClick={() =>  axios.get('http://localhost:3000/test').then(function (response) {
            setResponse(JSON.stringify(response));}).catch(function (error) {setResponse(JSON.stringify(error));})}
        >
          GET
        </button>
        <button onClick={() =>  axios.post('http://localhost:3000/createRoom', {
          id: '####'
        }).then(function (response) {
            setResponse(JSON.stringify(response));}).catch(function (error) {setResponse(JSON.stringify(error));})}
        >
          POST
        </button>
        <p>
          <code>{response}</code>
        </p>
      </div>
    </>
  )
}

export default Debug
