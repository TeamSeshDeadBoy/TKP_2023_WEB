/* eslint-disable react/prop-types */


const Endgame = ({scores}) => {
  return (
    <div className="game_geometry white_bg">
        Endgame! Hooray!
        {JSON.stringify(scores)}
    </div>
  )
}

export default Endgame