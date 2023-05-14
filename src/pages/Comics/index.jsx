import "./comics.css";
import "../../components/ComicCard/comiccard.css";

import axios from "axios";
import { useState, useEffect } from "react";

import ComicCard from "../../components/ComicCard";

const Comics = ({
  searchComic,
  setSearchComic,
  setVisibleComic,
  visibleComic,
}) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [pageCharacters, setPageCharacters] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const limit = 50;
  const page = Math.trunc(Number(pageCharacters) / limit + 1);

  const handlePageChange = (event) => {
    const value = event.target.value;

    if (Number(value)) {
      if (Number(value) < Number(data.count) / limit) {
        setPageCharacters((Number(value) - 1) * limit);
        setErrorMessage("");
      } else if (Number(value) < Number(data.count)) {
        setErrorMessage("This page does not exist");
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/comics?title=${searchComic}&limit=${limit}&skip=${pageCharacters}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [searchComic, pageCharacters]);
  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <div className="container comicPage">
      <div className="search-box">
        <button className="btn-search">
          <i>🔍</i>
        </button>
        <input
          type="text"
          className="input-search"
          value={searchComic}
          placeholder="Find your Hero..."
          onChange={(event) => {
            setSearchComic(event.target.value);
          }}
        />
      </div>
      <div className="find-page">
        <div className="two-button">
          <button
            onClick={() => {
              setPageCharacters(0);
            }}
          >
            First Page
          </button>
          <button
            onClick={() => {
              if (pageCharacters >= Number(limit)) {
                setPageCharacters(pageCharacters - limit);
              }
            }}
          >
            Previous Page
          </button>
        </div>
        <div className="number-pageone">
          <p>{page}</p>
          <form>
            <input
              className="number-page"
              type="text"
              placeholder="0"
              onChange={handlePageChange}
            />
          </form>
        </div>
        <div className="two-button">
          <button
            onClick={() => {
              if (pageCharacters <= Number(data.count) - limit) {
                setPageCharacters(pageCharacters + limit);
              }
            }}
          >
            Next Page
          </button>
          <button
            onClick={() => {
              setPageCharacters(Number(data.count) - limit);
            }}
          >
            Last Page
          </button>
        </div>
      </div>
      <div className="error-vide-div">
        {errorMessage && <span style={{ color: "white" }}>{errorMessage}</span>}
      </div>
      <div className="comics">
        {data.results.map((comic) => {
          return (
            <ComicCard
              key={comic._id}
              comic={comic}
              onClick={() => {
                setVisibleComic(!visibleComic);
              }}
            />
          );
        })}
      </div>
      <div className="find-page">
        <div className="two-button">
          <button
            onClick={() => {
              setPageCharacters(0);
            }}
          >
            First Page
          </button>
          <button
            onClick={() => {
              if (pageCharacters >= Number(limit)) {
                setPageCharacters(pageCharacters - limit);
              }
            }}
          >
            Previous Page
          </button>
        </div>
        <div className="number-pageone">
          <p>{page}</p>
          <form>
            <input
              className="number-page"
              type="text"
              placeholder="0"
              onChange={handlePageChange}
            />
          </form>
        </div>
        <div className="two-button">
          <button
            onClick={() => {
              if (pageCharacters <= Number(data.count) - limit) {
                setPageCharacters(pageCharacters + limit);
              }
            }}
          >
            Next Page
          </button>
          <button
            onClick={() => {
              setPageCharacters(Number(data.count) - limit);
            }}
          >
            Last Page
          </button>
        </div>
      </div>
      <div className="error-vide-div">
        {errorMessage && <span style={{ color: "white" }}>{errorMessage}</span>}
      </div>
    </div>
  );
};

export default Comics;
