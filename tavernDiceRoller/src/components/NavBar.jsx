import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <nav className="navbar justify-content-center m-2">
      <div className="container-fluid justify-content-center">
        <ul className="navbar-nav flex-row flex-wrap justify-content-center gap-2">
          <li className="nav-item">
            <NavLink className={navLinkClass} to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={navLinkClass} to="/about">
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={navLinkClass} to="/contact">
              Contact
            </NavLink>
          </li>

          {user ? (
            <>
              <li className="nav-item">
                <span className="nav-link">Hey, {user.username}!</span>
              </li>
              <li className="nav-item">
                <NavLink className={navLinkClass} to="/account">
                  Account
                </NavLink>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-danger btn-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <NavLink className={navLinkClass} to="/login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={navLinkClass} to="/register">
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
