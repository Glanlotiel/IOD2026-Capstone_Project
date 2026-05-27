import { useState } from "react";

export default function CharCreator() {
  const [stats, setStats] = useState([]);
  const labels = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];

  function rollDie(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + Math.ceil(min);
  }

  function rollStat() {
    let rolls = Array.from({ length: 4 }, () => rollDie(1, 6));
    rolls.sort((a, b) => a - b);
    rolls.shift();
    return rolls.reduce((sum, val) => sum + val, 0);
  }

  function handleRollCharacter() {
    setStats(Array.from({ length: 6 }, () => rollStat()));
  }

  return (
    <>
      <div className="card col-4">
        <div className="card-body">
          <h3 className="card-title">Character Creator</h3>
          <button onClick={handleRollCharacter}>Roll Character</button>
          <hr />
          <div>
            {stats.map((stat, i) => (
              <p key={i}>
                {labels[i]}: {stat}
              </p>
            ))}
          </div>
          <hr />
        </div>
      </div>
    </>
  );
}
