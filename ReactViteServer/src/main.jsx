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
import Rooms from './Rooms.jsx'
import Login from './Login.jsx'
import Register from './Register.jsx'
import axios from 'axios'

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
    element: <Rooms />,
  },
  {
    path: "/login",
    element: <Login />,   
  },
  {
    path: "/register",
    element: <Register />,   
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
