import React, { createContext, useContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = async ({ email, password }) => {
    try {
      const response = await axios.post("http://localhost/loginn.php", {
        email,
        password,
      });
      console.log("Response:", response.data);
      if (response.data.message === "Login successful") {
        setIsLoggedIn(true);
        setUser(response.data.user);
        setUserId(response.data.user.user_id);
        return response.data;
      } else {
        setIsLoggedIn(false);
        setUser(null);
        setUserId(null);
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  const signin = async ({ name, email, password }) => {
    try {
      const response = await axios.post("http://localhost/signin.php", {
        name,
        email,
        password,
      });
      console.log("Response:", response.data);
      if (response.data.message === "Data added to database successfully") {
        setIsSignedIn(true);
        setUser(response.data.user);
        setUserId(response.data.user.user_id);
        return response.data;
      } else {
        setIsSignedIn(false);
        setUser(null);
        setUserId(null);
        throw new Error("Sign up failed");
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.get("http://localhost/logout.php");
      setIsLoggedIn(false);
      setIsSignedIn(false);
      setUser(null);
      setUserId(null);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, login, logout, signin, userId, isSignedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
