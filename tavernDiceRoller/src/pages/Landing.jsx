import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Landing() {
  return (
    <>
      <div className="container landing-grid">
        <Link to="/dice" className="landing-card">
          <h4>Roll Some Dice</h4>
        </Link>
        <Link to="/charactercreator" className="landing-card">
          <h4>Make A Character</h4>
        </Link>
      </div>
    </>
  );
}
