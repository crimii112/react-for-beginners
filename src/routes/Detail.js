import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loader}>
          <span>Loading...</span>
        </div>
      ) : (
        <div className={styles.movie}>
          <img
            src={movie.medium_cover_image}
            alt=""
            className={styles.movie__img}
          />
          <div>
            <h2 className={styles.movie__title}>
              {movie.title}({movie.year})
            </h2>
            <h3 className={styles.movie__rating}>{movie.rating}</h3>
            <p>
              {movie.description_full === ""
                ? "--- No description ---"
                : movie.description_full}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
