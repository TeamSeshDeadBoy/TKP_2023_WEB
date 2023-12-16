/* eslint-disable react/prop-types */

import { useState } from "react"


const Endgame = ({scores, connected}) => {
  const modifiedObj = (object) => {
    return {userId: object.userId, userName: connected.filter(a => a.userId === object.userId)[0].name, scores: object.scores}
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