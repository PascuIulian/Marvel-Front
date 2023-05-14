import "./comiccard.css";

import noComicImg from "../../assets/no-comic-image.png";

const ComicCard = ({ comic, onClick }) => {
  return (
    <article className="comicCard" onClick={onClick}>
      <h2>{comic.title}</h2>
      {comic.thumbnail.path !==
      "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? (
        <img
          src={comic.thumbnail.path + "." + comic.thumbnail.extension}
          alt={comic.title}
        />
      ) : (
        <img src={noComicImg} alt="" />
      )}
      {/* <p>{comic.description}</p> */}
    </article>
  );
};

export default ComicCard;
