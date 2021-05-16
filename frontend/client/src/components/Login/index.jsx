import React from "react";
import { useHistory, useLocation } from "react-router-dom";

export default function Login() {
  const history = useHistory();
  const { state } = useLocation();

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("token", 1);
    history.push((state && state.from) || `/`);
  };
  return (
    <>
      <h1 style={{marginBottom: '1.5rem'}}>Please Login</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" name="email" id="email" placeholder="email" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />

        <input type="submit" value="Login" />
      </form>
    </>
  );
}
