/* eslint-disable react/prop-types */

import { useState } from "react"


const Endgame = ({scores, socket}) => {
  const connected =JSON.parse(localStorage.getItem('connections'))
  console.log("Received scores :", scores)
  console.log("Connected people:", connected)
  const modifiedObj = (object) => {
    console.log("Object before mutating:", object)
    console.log("Objecy filtration:", connected.filter(a => a.userId == object.userId))
    return {userId: object.userId, userName: connected.filter(a => a.userId == object.userId)[0].userName, score: object.coins}
  }

  let modifiedScores = []
  for (let i = 0; i < scores.length; i++){
    modifiedScores.push(modifiedObj(scores[i]))
  }
  socket.emit('end', {roomId: localStorage.getItem('userId'), scores: modifiedScores})

  return (
    <div className="game_geometry white_bg">
        Endgame! Hooray!
        {JSON.stringify({roomId: localStorage.getItem('userId'), scores: modifiedScores})}
    </div>
  )
}

export default Endgame