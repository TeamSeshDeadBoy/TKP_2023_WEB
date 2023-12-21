/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"


const Lobby = ({users, passStartFlag, roomId}) => {
  const [usersState, setUsersState] = useState(users)
  useEffect(() => {
    setUsersState(users)
  }, [users])

  function renderUsers() {
    let temp = []
    for (let i = 0; i < usersState.length; i++) {
      temp.push(<div key={usersState[i].userId} className="user_card">{usersState[i].userName}</div>)
    }
    return temp
  }

  
  return (
    <div className="lobby game_geometry ">
        <p className="user_count">{usersState.length} <span className="room_id">{roomId}</span><span className="room_helptext"> - код подключения</span></p>
        <div className="user_card_wrapper gray_scroll">{renderUsers()}</div>
        <button className="start_button" onClick={() => passStartFlag(true)}>СТАРТ</button>
    </div>
  )
}

export default Lobby