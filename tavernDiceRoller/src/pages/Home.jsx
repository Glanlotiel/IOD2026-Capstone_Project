import DiceRoller from "../components/DiceRoller";
import CharCreator from "../components/CharCreator";

export default function Home() {
  return (
    <main className="container gap-2">
      <div className="row">
        <CharCreator />
        <DiceRoller />
      </div>
    </main>
  );
}
