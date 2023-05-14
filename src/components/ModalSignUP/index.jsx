import "./modalsignup.css";

import { useState } from "react";
import axios from "axios";

const ModalSignUP = ({ setVisibleSignup, handleToken, token }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

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
    setErrorMessage("");

    try {
      const response = await axios.post(
        "site--marvel-back--qq6svdx7d7wt.code.run/user/signup",
        {
          email: email,
          username: username,
          password: password,
        }
      );

      if (response.data.token) {
        handleToken(response.data.token);
        setVisibleSignup(false);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 409) {
        setErrorMessage("This email address is already used");
      } else if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Please complete all fields");
      }
    }
  };

  return (
    <div className="modal-root">
      <div className="modal">
        <div className="button-x">
          <div className="div-vide2"></div>
          <button
            onClick={() => {
              setVisibleSignup(false);
            }}
          >
            X
          </button>
        </div>
        <form onSubmit={handleSubmit} className="form">
          <p>Create a new account</p>
          <input
            placeholder="Username"
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            className="user-box"
          />
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
          <input type="submit" value="Sign Up" className="button-form" />
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default ModalSignUP;
