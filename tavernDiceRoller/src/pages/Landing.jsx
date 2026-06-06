import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Landing() {
  return (
    <>
      <div className="container landing-grid">
        <Link to="/dice" className="landing-card">
          <h4 className="landingText">Roll Some Dice</h4>
        </Link>
        <Link to="/charactercreator" className="landing-card">
          <h4 className="landingTest">Make A Character</h4>
        </Link>
      </div>
    </>
  );
}
