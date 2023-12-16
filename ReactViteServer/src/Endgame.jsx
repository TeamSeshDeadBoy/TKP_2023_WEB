/* eslint-disable react/prop-types */

import { useState } from "react"


const Endgame = ({scores}) => {
  const connected =JSON.parse(localStorage.getItem('connections'))
  console.log("Received scores :", scores)
  console.log("Connected people:", connected)
  const modifiedObj = (object) => {
    console.log("Object before mutating:", object)
    console.log("Objecy filtration:", connected.filter(a => a.userId == object.userId))
    return {userId: object.userId, userName: connected.filter(a => a.userId == object.userId)[0].userName, scores: object.scores}
  }
  scores.map((obj) => modifiedObj(obj))

  return (
    <div className="game_geometry white_bg">
        Endgame! Hooray!
        {JSON.stringify(scores)}
    </div>
  )
}

export default Endgame