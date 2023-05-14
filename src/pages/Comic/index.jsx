import "./comic.css";

import noComicImg from "../../assets/no-comic-image.png";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Comic = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-back--qq6svdx7d7wt.code.run/comic/${id}`
        );
        setData(response.data);
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
    <div className="container">
      <h3>{data.title}</h3>
      {data.thumbnail.path !==
      "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? (
        <img
          src={data.thumbnail.path + "." + data.thumbnail.extension}
          alt={data.title}
        />
      ) : (
        <img src={noComicImg} alt="" />
      )}
    </div>
  );
};
export default Comic;
