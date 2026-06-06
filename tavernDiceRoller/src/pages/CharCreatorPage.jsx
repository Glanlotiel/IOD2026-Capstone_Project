import { CharCreator, CharPage } from "../components";
import {useState} from 'react'
export default function CharCreatorPage() {
  const [stats, setStats] = useState([]);

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
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-3">
            <CharCreator stats={stats} onRoll={handleRollCharacter}></CharCreator>
          </div>

          <div className="col-12 col-md-9">
            <CharPage stats={stats}></CharPage>
          </div>
        </div>
      </div>
    </>
  );
}
