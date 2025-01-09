import Die from "../components/Die"
import React from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";


export default function App() {
  const [game, setGame] = React.useState(0)
  const [dice, setDice] = React.useState(generateAllNewDice())


  // const [gameWon, setGameWon] = React.useState(false)

  function generateAllNewDice() {
    let arr = []
    for (let i = 0; i < 10; i++) {
      arr.push({
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid()
      });
    }
    return arr
  }

  function rollDice() {
    setDice(prevDices => {

      return prevDices.map(die => {
        return !die.isHeld ? { ...die, value: (Math.floor(Math.random() * 6) + 1) } : die
      })
    })
  }

  function onDieClicked(id) {
    setDice((prevDices) => {

      // for(let i=0;i<10;i++)
      // {
      //   console.log(prevDices[i])
      //   if(prevDices[i].id === id)
      //   {
      //     prevDices[i].isHeld = true
      //   }
      // }
      // return prevDices

      return prevDices.map(die => {

        if (die.id === id && (game === 0 || game === die.value)) {
          die = { ...die, isHeld: true }
          setGame(die.value)
        }
        return die
      })
    })
  }

  const diceElements = dice.map(el => <Die
    num={el.value}
    isHeld={el.isHeld}
    key={el.id}
    id={el.id}
    onDieClicked={onDieClicked} />
  )

  function newGame(){
    setDice(generateAllNewDice())
    setGame(0);
  }

  let f = true
  for (let i = 0; i < 10; i++) {
    if (dice[i].isHeld === false) {
      f = false
    }
  }

  return (
    <main>
      {f && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>

      {!f && <button className="roll-dice" onClick={rollDice}>Roll</button>}
      {f && <button className="roll-dice" onClick={newGame}>New Game</button>}
    </main>
  )
}