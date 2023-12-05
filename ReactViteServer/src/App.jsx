import { useState } from 'react'
import axios from "axios";
import './App.css'

function App() {
  const [response, setResponse] = useState('Test GET')
  const [response2, setResponse2] = useState('Test POST')

  return (
    <>
      <h1>Рубильник</h1>
      <div className="card">
        <button onClick={() =>  axios.get('http://localhost:3000/test').then(function (response) {
            setResponse(response.data.data);}).catch(function (error) {console.log(error);})}
        >
          {response}
        </button>
        <button onClick={() =>  axios.post('http://localhost:3000/createRoom', {
          id: '####'
        }).then(function (response) {
            setResponse2(response.data.data);}).catch(function (error) {console.log(error);})}
        >
          {response2}
        </button>
        <p>
          На этот раз попробуй в <code>./ReactViteServer/package.json</code>
        </p>
      </div>
    </>
  )
}

export default App
