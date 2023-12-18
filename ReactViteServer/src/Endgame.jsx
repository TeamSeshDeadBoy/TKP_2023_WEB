/* eslint-disable react/prop-types */

import { useState } from "react"


const Endgame = ({scores, scoresToParent}) => {
  const connected =JSON.parse(localStorage.getItem('connections'))
  console.log("Received scores :", scores)
  console.log("Connected people:", connected)
  const modifiedObj = (object) => {
    console.log("Object before mutating:", object)
    console.log("Objecy filtration:", connected.filter(a => a.userId == object.userId))
    return {userId: object.userId, userName: connected.filter(a => a.userId == object.userId)[0].userName, score: object.coins}
  }

  let modifiedScores = []
  if (scores.length > 0){
    for (let i = 0; i < scores.length; i++){
      modifiedScores.push(modifiedObj(scores[i]))
    }
    console.log("Counted scroes:", modifiedScores)
  }

  let notZeros = []
  for (var k = 0; k < modifiedScores.length; k++) {
    notZeros.push(modifiedScores[k].userId);
  }
  console.log("Not zeros (people with scores):", notZeros)

  let zeros = connected.filter(usr => notZeros.indexOf(usr.userId) == -1);
  console.log("Zeros (people without scores):", zeros)

  for (let i = 0; i < zeros.length; i++){
    modifiedScores.push({userId: zeros[i], userName: connected.filter(a => a.userId == zeros[i])[0].userName, score: 0})
  }

  scoresToParent({roomId: localStorage.getItem('userId'), scores: modifiedScores})

  return (
    <div className="game_geometry white_bg">
        Endgame! Hooray!
        {JSON.stringify({roomId: localStorage.getItem('userId'), scores: modifiedScores})}
    </div>
  )
}

export default Endgame