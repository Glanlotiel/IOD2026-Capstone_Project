import { useState, useEffect } from "react";
import "../styles/charpage.css";

export default function CharPage({ stats = [] }) {
  const [statSkills, setStatSkills] = useState([
    {
      stat: "Strength",
      value: stats[0] ?? 10,
      savingThrow: false,
      skills: [{ name: "Athletics", checked: false }],
    },
    {
      stat: "Dexterity",
      value: stats[1] ?? 10,
      savingThrow: false,
      skills: [
        { name: "Acrobatics", checked: false },
        { name: "Sleight Of Hand", checked: false },
        { name: "Stealth", checked: false },
      ],
    },
    {
      stat: "Constitution",
      value: stats[2] ?? 10,
      savingThrow: false,
      skills: [],
    },
    {
      stat: "Intelligence",
      value: stats[3] ?? 10,
      savingThrow: false,
      skills: [
        { name: "Arcana", checked: false },
        { name: "History", checked: false },
        { name: "Investigation", checked: false },
        { name: "Nature", checked: false },
        { name: "Religion", checked: false },
      ],
    },
    {
      stat: "Wisdom",
      value: stats[4] ?? 10,
      savingThrow: false,
      skills: [
        { name: "Animal Handling", checked: false },
        { name: "Insight", checked: false },
        { name: "Medicine", checked: false },
        { name: "Perception", checked: false },
        { name: "Survival", checked: false },
      ],
    },
    {
      stat: "Charisma",
      value: stats[5] ?? 10,
      savingThrow: false,
      skills: [
        { name: "Deception", checked: false },
        { name: "Intimidation", checked: false },
        { name: "Performance", checked: false },
        { name: "Persuasion", checked: false },
      ],
    },
  ]);

  useEffect(() => {
    setStatSkills((prev) =>
      prev.map((statBlock, i) => ({
        ...statBlock,
        value: stats[i] ?? 10,
      })),
    );
  }, [stats]);

  const [proficiencyBonus, setProficiencyBonus] = useState(2);

  function toggleSavingThrow(i) {
    setStatSkills(
      statSkills.map((statBlock, index) =>
        index === i
          ? { ...statBlock, savingThrow: !statBlock.savingThrow }
          : statBlock,
      ),
    );
  }

  function toggleSkill(statIndex, skillIndex) {
    setStatSkills(
      statSkills.map((statBlock, i) =>
        i === statIndex
          ? {
              ...statBlock,
              skills: statBlock.skills.map((skill, j) =>
                j === skillIndex
                  ? { ...skill, checked: !skill.checked }
                  : skill,
              ),
            }
          : statBlock,
      ),
    );
  }
  const [attacks, setAttacks] = useState([
    { name: "", bonus: "", damage: "" },
    { name: "", bonus: "", damage: "" },
    { name: "", bonus: "", damage: "" },
  ]);

  const [equipment, setEquipment] = useState([
    { name: "", amount: 0, weight: 0 },
  ]);

  const [skill, setSkill] = useState([
    { name: "", class: "", description: "" },
  ]);

  return (
    <>
      <main className="charSheet">
        <div className="row">
          <div className="headerBlock row">
            {" "}
            {/* Character Information */}
            <div className="col-3">
              <input
                type="text"
                className="classAndLevel mb-1"
                defaultValue="Class & Level"
              />
              <input type="text" className="race mb-1" defaultValue="Race" />
            </div>
            <div className="col-3">
              <input
                type="text"
                className="background mb-1"
                defaultValue="Background"
              />
              <input
                type="text"
                className="experience mb-1"
                defaultValue="Experience"
              />
            </div>
            <div className="col-12">
              <input
                type="text"
                className="namePlate w-100"
                defaultValue="Name Here"
              />
            </div>
            <label>
              Proficiency Bonus:
              <input
                type="number"
                min={2}
                max={6}
                value={proficiencyBonus}
                onChange={(e) => setProficiencyBonus(Number(e.target.value))}
              />
            </label>
          </div>

          <div className="col-3">
            <div className="skills">
              {" "}
              {/* Maps skills & renders them onto the page */}
              {statSkills.map((statBlock, i) => (
                <div key={statBlock.stat} className="d-flex gap-2">
                  <div className="d-flex flex-column">
                    <p>{statBlock.stat}</p>
                    <p>{statBlock.value}</p>
                    <p>+{Math.floor((statBlock.value - 10) / 2)}</p>
                  </div>
                  <div className="d-flex flex-column">
                    <label>
                      <input
                        type="checkbox"
                        checked={statBlock.savingThrow}
                        onChange={() => toggleSavingThrow(i)}
                      />
                      <span>
                        {Math.floor((statBlock.value - 10) / 2) +
                          (statBlock.savingThrow ? proficiencyBonus : 0) >=
                        0
                          ? "+"
                          : ""}
                        {Math.floor((statBlock.value - 10) / 2) +
                          (statBlock.savingThrow ? proficiencyBonus : 0)}
                      </span>
                      Saving Throw
                    </label>
                    {statBlock.skills.map((skill, j) => (
                      <label key={skill.name}>
                        <input
                          type="checkbox"
                          checked={skill.checked}
                          onChange={() => toggleSkill(i, j)}
                        />
                        <span>
                          {Math.floor((statBlock.value - 10) / 2) +
                            (skill.checked ? proficiencyBonus : 0) >=
                          0
                            ? "+"
                            : ""}
                          {Math.floor((statBlock.value - 10) / 2) +
                            (skill.checked ? proficiencyBonus : 0)}
                        </span>
                        {skill.name}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="proficiencies">
              {" "}
              {/* Proficiencies */}
              <label className="d-block">
                Languages:
                <textarea rows={3} className="w-100" />
              </label>
              <label className="d-block">
                Weapons:
                <textarea rows={3} className="w-100" />
              </label>
              <label className="d-block">
                Armor:
                <textarea rows={3} className="w-100" />
              </label>
              <label className="d-block">
                Tools:
                <textarea rows={3} className="w-100" />
              </label>
            </div>
          </div>

          <div className="col-5">
            <div className="combatStats row">
              {" "}
              {/* Core Combat Stats */}
              <div className="col-4">
                <label>
                  AC =
                  <input type="text" defaultValue=" 10 " />
                </label>

                <label>
                  Maximum Health =
                  <input type="text" defaultValue=" 0" />
                </label>

                <h4>Death Saving Throws</h4>
                <label>
                  Successes
                  <input type="checkbox" />
                  <input type="checkbox" />
                  <input type="checkbox" />
                </label>

                <label>
                  Failures
                  <input type="checkbox" />
                  <input type="checkbox" />
                  <input type="checkbox" />
                </label>
              </div>
              <div className="col-5">
                <label>
                  Initiative =
                  <input type="text" defaultValue=" + 0 " />
                </label>

                <label>
                  Current Health =
                  <input type="text" defaultValue=" 0 " />
                </label>

                <label>
                  Temporary Health =
                  <input type="text" defaultValue=" 0 " />
                </label>
              </div>
              <div className="col-4">
                <label>
                  Speed =
                  <input type="text" defaultValue=" 30ft " />
                </label>

                <label>
                  Hit Dice =
                  <input type="text" defaultValue=" 0 " />
                </label>
              </div>
            </div>

            <div className="attacks table-responsive">
              {/* Attack & Spellcasting Table*/}
              <table className="w-100">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Attack Bonus</th>
                    <th>Damage/Type</th>
                  </tr>
                </thead>
                <tbody>
                  {attacks.map((attack, i) => (
                    <tr key={i}>
                      <td>
                        <input type="text" />
                      </td>
                      <td>
                        <input
                          type="text"
                          maxLength={3}
                          style={{ width: "50px" }}
                        />
                      </td>
                      <td>
                        <input type="text" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                onClick={() =>
                  setAttacks([...attacks, { name: "", bonus: "", damage: "" }])
                }
              >
                {" "}
                Add an attack{" "}
              </button>
            </div>
            <div className="currency row">
              {/* Currency */}
              <div className="col-2">
                <label className="d-block">
                  CP:
                  <input type="text" className="w-100" />
                </label>
              </div>
              <div className="col-2">
                <label className="d-block">
                  SP:
                  <input type="text" className="w-100" />
                </label>
              </div>
              <div className="col-2">
                <label className="d-block">
                  EP:
                  <input type="text" className="w-100" />
                </label>
              </div>
              <div className="col-3">
                <label className="d-block">
                  GP:
                  <input type="text" className="w-100" />
                </label>
              </div>
              <div className="col-3">
                <label className="d-block">
                  PP:
                  <input type="text" className="w-100" />
                </label>
              </div>
            </div>

            <div className="equipment table-responsive">
              <table className="w-100">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Weight</th>
                  </tr>
                </thead>
                <tbody>
                  {equipment.map((equipment, i) => (
                    <tr key={i}>
                      <td>
                        <input type="text" />
                      </td>
                      <td>
                        <input
                          type="text"
                          maxLength={3}
                          style={{ width: "50px" }}
                        />
                      </td>
                      <td>
                        <input type="text" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                onClick={() =>
                  setEquipment([
                    ...equipment,
                    { name: "", amount: 0, weight: 0 },
                  ])
                }
              >
                {" "}
                Add equipment{" "}
              </button>
            </div>
          </div>
          <div className="col-4">
            <div className="personality">
              <div>
                <label className="d-block">
                  Personality Traits
                  <textarea rows={3} className="w-100" />
                </label>
              </div>
              <div>
                <label className="d-block">
                  Bonds
                  <textarea rows={3} className="w-100" />
                </label>
              </div>{" "}
              <div>
                <label className="d-block">
                  Ideals
                  <textarea rows={3} className="w-100" />
                </label>
              </div>
              <div>
                <label className="d-block">
                  Flaws
                  <textarea rows={3} className="w-100" />
                </label>
              </div>
            </div>

            <table className="w-100">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Class</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {skill.map((skill, i) => (
                  <tr key={i}>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <textarea rows={2} className="w-100" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={() =>
                setSkill([...skill, { name: "", class: "", description: "" }])
              }
            >
              {" "}
              Add skill{" "}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
