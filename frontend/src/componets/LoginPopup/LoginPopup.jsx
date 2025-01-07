import React, { useState, useContext } from "react";
import "./LoginPopoup.css";
import { assets } from "../../assets/assets";
import { AuthContext } from "./../../context/AuthContext";
import { useForm } from "react-hook-form";

const LoginPopup = ({ setShowLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login, signin, isLoggedIn, isSignedIn } = useContext(AuthContext);
  const [alertMessage, setAlertMessage] = useState(null);
  const [currentState, setCurrentState] = useState("Sign up");

  const onSubmit = async (data) => {
    try {
      if (currentState === "Login") {
        await login(data);
        {
          isLoggedIn || isSignedIn
            ? setAlertMessage("Login successful")
            : setAlertMessage("Invalid username and email");
        }
        setShowLogin(false);
      } else {
        await signin(data);
        {
          isLoggedIn || isSignedIn
            ? setAlertMessage("Login successful")
            : setAlertMessage("Invalid username and email");
        }

        setShowLogin(false);
      }
    } catch (error) {
      setAlertMessage(error.message || "An error occurred");
    }

    // Clear the alert after 5 seconds
    setTimeout(() => {
      setAlertMessage(null);
    }, 1000);
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={handleSubmit(onSubmit)}>
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
          />
        </div>
        <div className="login-popup-input">
          {currentState !== "Login" && (
            <div>
              <input
                type="text"
                placeholder="Your Name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <span className="error-message">{errors.name.message}</span>
              )}
            </div>
          )}
          <div>
            <input
              type="email"
              placeholder="Your Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <span className="error-message">{errors.email.message}</span>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
            />
            {errors.password && (
              <span className="error-message">{errors.password.message}</span>
            )}
          </div>
          <button type="submit">
            {currentState === "Sign up" ? "Create account" : "Login"}
          </button>
        </div>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currentState === "Login" ? (
          <p>
            Create a new account?
            <span onClick={() => setCurrentState("Sign up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?
            <span onClick={() => setCurrentState("Login")}>Login here</span>
          </p>
        )}
      </form>
      {alertMessage && <div className="alert">{alertMessage}</div>}
    </div>
  );
};

export default LoginPopup;
