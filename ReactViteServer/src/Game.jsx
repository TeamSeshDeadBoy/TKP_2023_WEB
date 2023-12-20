/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"


const Game = ({answers, passNext, passReveal, length}) => {
    const colors = ["#709B95", "#F08A5D", "#B83B5E", "#D9D9D9"]
    const wrongColors = ["#4A605D", "#8A5741", "#6E3041", "#7F7F7F"]
    const letters = ["А", "Б", "В", "Г"]
    const [num, setNum] = useState(0)
  const [revealed, setRevealed] = useState(false)

    function renderAnswers() {
        let temp = []
        for (let i = 0; i < answers.answers.length; i++) {
          temp.push(<div key={JSON.stringify(answers.answers[i])} 
          style={(i == 2 && answers.answers.length == 3) ? {backgroundColor: colors[i], left: "300px"} : {backgroundColor: colors[i]}} className="answer">
            {answers.answers[i].text}
            <div className={i == 0 ? "letter_1" : i == 1 ? "letter_2" : i == 2 ? "letter_3" : "letter_4"}>{letters[i]}</div>
            </div>)
        }
        return temp
      }

      function renderRevealed() {
        let tempRev = []
        for (let i = 0; i < answers.answers.length; i++) {
          tempRev.push(<div key={JSON.stringify(answers.answers[i])} 
          style={(i == 2 && answers.answers.length == 3) ? (i == answers.validIndex ? {backgroundColor: colors[i], left: "300px"} : {backgroundColor: wrongColors[i], left: "300px"}) : (i == answers.validIndex ? {backgroundColor: colors[i]} : {backgroundColor: wrongColors[i]})} className="answer">
            {answers.answers[i].text}
            <div className={i == 0 ? "letter_1" : i == 1 ? "letter_2" : i == 2 ? "letter_3" : "letter_4"}>{letters[i]}</div>
            </div>)
        }
        return tempRev
      }

      const toPass = () => {
        setRevealed(true)
        passReveal(true)
        setTimeout(() => passNext(true), 4000)
      }

      useEffect(() => {
        setRevealed(false)
        setNum(num + 1)
      }, [answers])
      

      // const toPassReveal = () => {
      //   setRevealed(true)
      //   passReveal(true)
      // }

  return (
    <div className="game_geometry">
        {/* {revealed ? answers.answers[answers.validIndex].text : ""} */}
        <div className="question_title">{answers.text}</div>
        <div className="question_numbers">{num}/{length}</div>
        <div className="question">{ revealed ? renderRevealed() : renderAnswers()}</div>
        {/*<div className="clock">120</div>*/}
        <button className={revealed ? "absolute_tr question_next_btn" : "absolute_tr question_next_btn"} onClick={() => {toPass()}}>СЛЕДУЮЩИЙ</button>
        {/* <button className="absolute_tr space_top a_to_normal black" onClick={() => {toPassReveal()}}>ПОКАЗАТЬ</button> */}
    </div>
  )
}

export default Game
