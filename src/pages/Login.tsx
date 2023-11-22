import { useState, ChangeEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/SignInForm.css";
import axios from "axios";
import useAuthContext from "../hooks/useAuthContext";

const Login = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleDetails = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setLoginDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleLogin = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = loginDetails;
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3500/login", params);
      dispatch({ type: "Log In", payload: response.data });
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/");
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="signin-form">
      <h1>Log In</h1>
      <form onSubmit={handleLogin}>
        <div className="form-details">
          <label>E-mail</label>
          <input
            type="email"
            className="input-field"
            name="email"
            value={loginDetails.email}
            onChange={handleDetails}
          />
        </div>
        <div className="form-details">
          <label>Password</label>
          <input
            type="password"
            className="input-field"
            name="password"
            value={loginDetails.password}
            onChange={handleDetails}
          />
        </div>
        <button disabled={isLoading}>Login</button>
      </form>
      <h4>
        Don't have an account. Click <NavLink to="/signup">here</NavLink> to
        create a new account.
      </h4>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Login;
