import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { NavBar } from "./components";
import {
  Dice,
  About,
  Contact,
  CharCreatorPage,
  Login,
  Register,
  Account,
  Landing,
} from "./pages";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  return children;
}
import "./styles/App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <header className="header text-center">
            <h1> The Tavern Dice Roller</h1>
          </header>
        </Link>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/dice" element={<Dice />}></Route>
          <Route
            path="/charactercreator"
            element={<CharCreatorPage></CharCreatorPage>}
          ></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>

      <footer className="footer text-center m-2 fixed-bottom">
        <p> Made by Thomas C. Long with React and Bootstrap 2026</p>
      </footer>
    </>
  );
}

export default App;
