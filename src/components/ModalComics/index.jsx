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
        const response = await axios.get(
          `https://site--marvel-back--qq6svdx7d7wt.code.run/comic/5fce13de78edeb0017c92d68`
        );
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
    <div className="modal-root comic">
      <div className="modal">
        <button
          onClick={() => {
            setVisibleComic(false);
          }}
        >
          X
        </button>
        <div>
          Je voulais afficler la photo + description mais j'ai pas reussi
        </div>
      </div>
    </div>
  );
};

export default ModalComics;
