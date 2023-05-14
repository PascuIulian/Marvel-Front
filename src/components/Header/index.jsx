import "./header.css";

import logo from "../../assets/marvel_logo5.png";
import { Link } from "react-router-dom";

const Header = ({
  token,
  handleToken,
  handleMouseOutCharacters,
  handleMouseOverCharacters,
  handleMouseOutComics,
  handleMouseOverComics,
}) => {
  return (
    <header>
      <Link to="/">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
      </Link>
      <div className="middle-button">
        <Link to="/characters">
          <button
            className="button-27"
            onMouseOver={handleMouseOverCharacters}
            onMouseOut={handleMouseOutCharacters}
          >
            Characters
          </button>
        </Link>
        <Link to="/comics">
          <button
            className="button-27"
            onMouseOver={handleMouseOverComics}
            onMouseOut={handleMouseOutComics}
          >
            Comics
          </button>
        </Link>
      </div>
      {token ? (
        <Link to="/">
          <button
            className="button-28"
            onClick={() => {
              handleToken();
            }}
          >
            Deconexion
          </button>
        </Link>
      ) : (
        <div className="div-vide"></div>
      )}
      <Link to="/favorites">
        <button>Favorites</button>
      </Link>
    </header>
  );
};

export default Header;
