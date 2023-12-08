import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Debug from './Debug.jsx'
import Editor from './Editor.jsx'
import './index.css'
// import axios from 'axios'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Room from './Room.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: []
  },
  {
    path: "/editor",
    element: <Editor />,
  },
  {
    path: "/rooms",
    element: <Room />,
    // loader: () => {
    //   return axios.post('http://localhost:3000/createRoom', {
    //     userId: 'AAAAAA'
    //   })
    // }    
  },
  {
    path: "/debug",
    element: <Debug />,
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
