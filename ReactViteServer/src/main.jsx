import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Debug from './Debug.jsx'
import Room from './Room.jsx'
import './index.css'
import axios from 'axios'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: []
  },
  {
    path: "/room",
    element: <Room />,
    loader: () => {
      return axios.post('http://localhost:3000/createRoom', {
        id: '####'
      })
    }
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
