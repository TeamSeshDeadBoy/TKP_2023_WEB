/* eslint-disable react/prop-types */

import { useState } from "react"


const Game = ({answers, passNext, passReveal}) => {
    const colors = ["#709B95", "#F08A5D", "#B83B5E", "#D9D9D9"]
    const letters = ["А", "Б", "В", "Г"]
  const [revealed, setRevealed] = useState(false)

    function renderAnswers() {
        let temp = []
        for (let i = 0; i < answers.answers.length; i++) {
          temp.push(<div key={JSON.stringify(answers.answers[i])} style={(i == 2 && answers.answers.length == 3) ? {backgroundColor: colors[i], left: "300px"} : {backgroundColor: colors[i]}} className="answer">
            {answers.answers[i].text}
            <div className={i == 0 ? "letter_1" : i == 1 ? "letter_2" : i == 2 ? "letter_3" : "letter_4"}>{letters[i]}</div>
            </div>)
        }
        return temp
      }

      const toPass = () => {
        setRevealed(false)
        passNext(true)
      }

      const toPassReveal = () => {
        setRevealed(true)
        passReveal(true)
      }

  return (
    <div className="game_geometry">
        {revealed ? answers.answers[answers.validIndex].text : ""}
        <div className="question_title">{answers.text}</div>
        <div className="question">{renderAnswers()}</div>
        {/*<div className="clock">120</div>*/}
        <button className="absolute_tr a_to_normal black" onClick={() => {toPass()}}>СЛЕДУЮЩИЙ</button>
        <button className="absolute_tr space_top a_to_normal black" onClick={() => {toPassReveal()}}>ПОКАЗАТЬ</button>
    </div>
  )
}

export default Game
