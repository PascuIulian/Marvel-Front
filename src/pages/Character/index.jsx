import "./character.css";

import noHeroImg from "../../assets/no-hero-image.png";
import noComicImg from "../../assets/no-comic-image.png";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Character = () => {
  const [data, setData] = useState({});
  const [comicData, setComicData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/character/${id}`
        );
        setData(response.data);

        const response2 = await axios.get(`http://localhost:3000/comics/${id}`);
        setComicData(response2.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <div className="container characterDetails">
      <div className="character">
        <div className="star">
          <h3>{data.name}</h3>
        </div>
        {data.thumbnail.path !==
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? (
          <img
            src={data.thumbnail.path + "." + data.thumbnail.extension}
            alt={data.name}
          />
        ) : (
          <img src={noHeroImg} alt="" />
        )}
        <p>{data.description}</p>
      </div>
      <div className="characterComics">
        <h3>Character Comics</h3>
        {comicData.comics.map((characterComic) => {
          return (
            <Link to={`/comic/${characterComic._id}`} key={characterComic._id}>
              <div className="oneCharacterComic">
                <h4>{characterComic.title}</h4>
                {characterComic.thumbnail.path !==
                "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? (
                  <img
                    src={
                      characterComic.thumbnail.path +
                      "." +
                      characterComic.thumbnail.extension
                    }
                    alt={characterComic.title}
                  />
                ) : (
                  <img src={noComicImg} alt="" />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Character;
