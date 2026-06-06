import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Landing() {
  return (
    <>
      <div className="container">
        <div>
          <h4> Roll Some Dice </h4>
          <Link to="/dice"> Placeholder </Link>
        </div>
        <div>
          <h4> Make A Character </h4>
          <Link to="/charactercreator"> Placeholder </Link>
        </div>
      </div>
    </>
  );
}
