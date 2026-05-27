import { useState } from "react";

export default function DiceRoller() {
  const [log, setLog] = useState([]);
  const [currentResult, setCurrentResult] = useState(null);

  function rollDie(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const diceNumber = parseInt(event.target.diceNumber.value);
    const sides = parseInt(event.target.diceType.value);

    let total = 0;
    const rolls = [];
    for (let i = 0; i < diceNumber; i++) {
      const roll = rollDie(1, sides);
      rolls.push(roll);
      total += roll;
    }

    const resultText = `${diceNumber}d${sides} rolled ${total}!`;
    const entryText = `${diceNumber}d${sides} → [${rolls.join(", ")}] = ${total}`;

    setCurrentResult(resultText);
    setLog((prev) => [entryText, ...prev]); // prepend, like before
  }

  return (
    <>
      <div className="card col-4">
        <div className="card-body">
          <h3 className="card-title"> Dice Roller </h3>
          <hr />
          <form id="diceRoller" onSubmit={handleSubmit}>
            <input name="diceNumber" type="number" defaultValue={1} />
            <select name="diceType" defaultValue="6">
              <option value="4">d4</option>
              <option value="6">d6</option>
              <option value="8">d8</option>
              <option value="12">d12</option>
              <option value="20">d20</option>
              <option value="100">d100</option>
            </select>
            <br></br>
            <button type="submit">Roll</button>
          </form>
          <hr />
          {currentResult && <p id="currentResult">{currentResult}</p>}
        </div>
      </div>

      <div className="card col-4">
        <div className="card-body">
          <h3 className="card-title"> Dice Log</h3>
          <hr />
          <div id="diceLog">
            {log.map((entry, i) => (
              <p key={i}>{entry}</p>
            ))}
          </div>
          <hr />
          <button onClick={() => setLog([])}>Clear Log</button>
        </div>
      </div>
    </>
  );
}
