import { CharCreator, DiceRoller } from "../components";

export default function Dice() {
  return (
    <main className="container mx-auto">
      <div className="row">
        <div className="col-12 col-md-5">
          <CharCreator />
        </div>

        <div className="col-12 col-md-7">
          <DiceRoller />
        </div>
      </div>
    </main>
  );
}
