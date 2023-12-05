import { useState } from 'react'
import './App.css'

function App() {
  const [response, setResponse] = useState('Click me!')
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'New Room Created', userId: '#####' })
  };

  return (
    <>
      <h1>Рубильник</h1>
      <div className="card">
         {/* Ниже строчку редактируй после fetch */}
        <button onClick={() => fetch('http://localhost:5173/', requestOptions)
                .then(response => response.json())
                .then(data => setResponse(data.id))}
        >
          {response}
        </button>
        <p>
          Артем! Отредактируй строчку с ip:port (17) в <code>./ReactViteServer/src/App.jsx</code>
        </p>
      </div>
    </>
  )
}

export default App
