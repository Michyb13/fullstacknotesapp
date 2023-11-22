import { useState, ChangeEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Signup.css";
import axios from "axios";
import useAuthContext from "../hooks/useAuthContext";

const Signup = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const [signupDetails, setSignupDetails] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSigninDetails = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setSignupDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSignup = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (signupDetails.password !== signupDetails.confirmPassword) {
      setError("Passwords don't match!");
    } else {
      const params = {
        username: signupDetails.username,
        email: signupDetails.email,
        password: signupDetails.password,
      };
      setIsLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:3500/signup",
          params
        );
        dispatch({ type: "Log In", payload: response.data });
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/");
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setError(err.response.data.message);
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="signin-form">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <div className="form-details">
          <label>Username</label>
          <input
            type="text"
            className="input-field"
            name="username"
            value={signupDetails.username}
            onChange={handleSigninDetails}
          />
        </div>
        <div className="form-details">
          <label>E-mail</label>
          <input
            type="email"
            className="input-field"
            name="email"
            value={signupDetails.email}
            onChange={handleSigninDetails}
          />
        </div>
        <div className="form-details">
          <label>Password</label>
          <input
            type="password"
            className="input-field"
            name="password"
            value={signupDetails.password}
            onChange={handleSigninDetails}
          />
        </div>
        <div className="form-details">
          <label>Confirm Password</label>
          <input
            type="password"
            className="input-field"
            name="confirmPassword"
            value={signupDetails.confirmPassword}
            onChange={handleSigninDetails}
          />
        </div>
        <button disabled={isLoading}>Sign Up</button>
      </form>
      <h4>
        Already have an account? Sign in <NavLink to="/login">here</NavLink>
      </h4>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Signup;
