import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

const RootLayout = () => {
  const { state, dispatch } = useAuthContext();
  const navigate = useNavigate();
  const logout = () => {
    dispatch({ type: "Log Out" });
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div>
      <nav>
        <h1>
          <NavLink to="/">Notez</NavLink>
        </h1>
        {state.user.user || state.user.token ? (
          <div className="nav-actions">
            <h3>{state.user.user}</h3>
            <button onClick={logout} className="nav-button">
              Log Out
            </button>
          </div>
        ) : (
          <div className="nav-actions">
            <h3>
              <NavLink to="/login">Login</NavLink>
            </h3>
            <h3>
              <NavLink to="/signup">Sign Up</NavLink>
            </h3>
          </div>
        )}
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
