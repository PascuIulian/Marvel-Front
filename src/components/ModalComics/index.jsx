import "./modalcomics.css";

import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import noComicImg from "../../assets/no-comic-image.png";

const ModalComics = ({ setVisibleComic }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/comics`);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
    console.log(data.results);
  }, []);
  return (
    <div className="modal-root">
      <div className="modal">
        <button
          onClick={() => {
            setVisibleComic(false);
          }}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default ModalComics;
