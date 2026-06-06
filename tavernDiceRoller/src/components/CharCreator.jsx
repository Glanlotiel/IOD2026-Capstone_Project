import { useState } from "react";

export default function CharCreator({ stats: externalStats, onRoll }) {
  const [internalStats, setInternalStats] = useState([]);
  const labels = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];
  const stats = externalStats ?? internalStats;

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
    setInternalStats(Array.from({ length: 6 }, () => rollStat()));
  }

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">Character Creator</h3>
          <button className="w-100" onClick={onRoll ?? handleRollCharacter}>
            Roll Character
          </button>
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
