import "./charactercard.css";

import noHeroImg from "../../assets/no-hero-image.png";

import { Link } from "react-router-dom";

const CharacterCard = ({ character }) => {
  return (
    <Link to={`/character/${character._id}`}>
      <article className="characterCard">
        <h2>{character.name}</h2>
        {character.thumbnail.path !==
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? (
          <img
            src={character.thumbnail.path + "." + character.thumbnail.extension}
            alt={character.name}
          />
        ) : (
          <img src={noHeroImg} alt="" />
        )}

        {/* <p>{character.description}</p> */}
      </article>
    </Link>
  );
};

export default CharacterCard;
