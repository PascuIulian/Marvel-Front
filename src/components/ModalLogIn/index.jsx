import "./modallogin.css";

import { useState } from "react";
import axios from "axios";

const ModalLogIn = ({ handleToken, setVisibleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://site--marvel-back--qq6svdx7d7wt.code.run/user/login",
        {
          email: email,
          password: password,
        }
      );
      handleToken(response.data.token);
      setVisibleLogin(false);
    } catch (error) {
      console.log(error);
      setErrorMessage("The email or password is incorrect");
    }
  };

  return (
    <div className="modal-root">
      <div className="modal">
        <div className="button-x">
          <div className="div-vide2"></div>
          <button
            onClick={() => {
              setVisibleLogin(false);
            }}
          >
            X
          </button>
        </div>
        <form onSubmit={handleSubmit} className="form">
          <p>Log Into Marvel</p>
          <input
            placeholder="Email"
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            className="user-box"
          />
          <input
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            className="user-box"
          />
          <input type="submit" value="Log In" className="button-form" />
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default ModalLogIn;
