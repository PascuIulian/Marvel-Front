import "./home.css";

import axios from "axios";
import { useState, useEffect } from "react";
// import img from "../../assets/marvel-heroes2.png";

const Home = ({
  visibleSignup,
  setVisibleSignup,
  visibleLogin,
  setVisibleLogin,
  isHoveringCharacters,
  isHoveringComics,
}) => {
  const [data, setData] = useState({});
  const [comicData, setComicData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-back--qq6svdx7d7wt.code.run/characters`
        );
        setData(response.data);

        const response2 = await axios.get(
          `https://site--marvel-back--qq6svdx7d7wt.code.run/comics`
        );
        setComicData(response2.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="home">
      <div>
        {isHoveringCharacters && (
          <div className="hover-characters">
            {data.results.map((character) => {
              return (
                <div key={character._id}>
                  {character.thumbnail.path !==
                    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" && (
                    <img
                      src={
                        character.thumbnail.path +
                        "." +
                        character.thumbnail.extension
                      }
                      alt={character.name}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
        {isHoveringComics && (
          <div className="hover-characters">
            {comicData.results.map((characterComic) => {
              return (
                <div key={characterComic._id}>
                  {characterComic.thumbnail.path !==
                    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" && (
                    <img
                      src={
                        characterComic.thumbnail.path +
                        "." +
                        characterComic.thumbnail.extension
                      }
                      alt={characterComic.title}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="container home-buttons">
        <button
          className="button-92"
          onClick={() => {
            setVisibleSignup(!visibleSignup);
          }}
        >
          Sign Up
        </button>
        <button
          className="button-92"
          onClick={() => {
            setVisibleLogin(!visibleLogin);
          }}
        >
          Log In
        </button>
      </div>
      {/* <div className="home-pic">
        <img src={img} alt="" />
      </div> */}
    </div>
  );
};
export default Home;
