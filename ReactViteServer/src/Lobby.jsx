/* eslint-disable react/prop-types */


const Lobby = ({users, passStartFlag}) => {
  return (
    <div className="lobby game_geometry">
        <p className="user_count">{users.length}</p>
        <button onClick={() => passStartFlag(true)}>СТАРТ</button>
    </div>
  )
}

export default Lobby