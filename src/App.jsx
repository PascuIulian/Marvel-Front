import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ModalSignUp from "./components/ModalSignUP";
import ModalLogIn from "./components/ModalLogIn";
import ModalComics from "./components/ModalComics";

import Home from "./pages/Home";
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import Character from "./pages/Character";
import Comic from "./pages/Comic";
import Favorites from "./pages/Favorites";

function App() {
  const [token, setToken] = useState(Cookies.get("userToken") || null);

  const [searchCharacter, setSearchCharacter] = useState("");
  const [searchComic, setSearchComic] = useState("");
  const [visibleSignup, setVisibleSignup] = useState(false);
  const [visibleLogin, setVisibleLogin] = useState(false);
  const [visibleComic, setVisibleComic] = useState(false);

  const [isHoveringCharacters, setIsHoveringCharacters] = useState(false);
  const [isHoveringComics, setIsHoveringComics] = useState(false);

  const handleMouseOverCharacters = () => {
    setIsHoveringCharacters(true);
  };

  const handleMouseOutCharacters = () => {
    setIsHoveringCharacters(false);
  };

  const handleMouseOverComics = () => {
    setIsHoveringComics(true);
  };

  const handleMouseOutComics = () => {
    setIsHoveringComics(false);
  };

  const handleToken = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 14 });
      setToken(token);
    } else {
      Cookies.remove("userToken");
      setToken(null);
    }
  };

  return (
    <Router>
      <Header
        token={token}
        handleToken={handleToken}
        handleMouseOutCharacters={handleMouseOutCharacters}
        handleMouseOverCharacters={handleMouseOverCharacters}
        handleMouseOverComics={handleMouseOverComics}
        handleMouseOutComics={handleMouseOutComics}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              visibleSignup={visibleSignup}
              setVisibleSignup={setVisibleSignup}
              visibleLogin={visibleLogin}
              setVisibleLogin={setVisibleLogin}
              handleToken={handleToken}
              token={token}
              isHoveringCharacters={isHoveringCharacters}
              isHoveringComics={isHoveringComics}
            />
          }
        />
        <Route
          path="/characters"
          element={
            <Characters
              searchCharacter={searchCharacter}
              setSearchCharacter={setSearchCharacter}
            />
          }
        />
        <Route
          path="/comics"
          element={
            <Comics
              searchComic={searchComic}
              setSearchComic={setSearchComic}
              visibleComic={visibleComic}
              setVisibleComic={setVisibleComic}
            />
          }
        />
        <Route path="/character/:id" element={<Character />} />
        <Route path="/comic/:id" element={<Comic />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
      <Footer />
      {visibleSignup && (
        <ModalSignUp
          setVisibleSignup={setVisibleSignup}
          handleToken={handleToken}
          token={token}
        />
      )}
      {visibleLogin && (
        <ModalLogIn
          setVisibleLogin={setVisibleLogin}
          handleToken={handleToken}
          token={token}
        />
      )}
      {visibleComic && <ModalComics setVisibleComic={setVisibleComic} />}
    </Router>
  );
}

export default App;
