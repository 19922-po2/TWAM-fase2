import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import Notification from "../components/Notification.js";

//** Images */
export default function DetailsPage(props) {
  const api_key = "402cb8ff234f7b3f771274adb84a91ec";
  const acc_id = "12050039";
  const session = "c589f99a3833a16f0d5a9a7e6471f2b9109e8a0c";
  const imgURL = "https://image.tmdb.org/t/p/original";
  //id of the movie clicked
  let { id } = useParams();
  let location = useLocation();
  const { fav } = location.state;

  // component states
  const [isFavorite, setIsFavorite] = React.useState(fav);
  const [movie, setMovie] = React.useState({});
  const [showNot, setShowNot] = React.useState(false);

  // fetch details of movie
  React.useEffect(function () {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, []);

  //fetch favorites
  React.useEffect(function () {
    fetch(
      `https://api.themoviedb.org/3/account/${acc_id}/favorite/movies?api_key=${api_key}&language=en-US&sort_by=created_at.asc&page=1&session_id=${session}`
    ).then((res) => res.json());
  }, []);

  function addFavorite() {
    let movie_id = parseInt(id);
    fetch(
      `https://api.themoviedb.org/3/account/${acc_id}/favorite?api_key=${api_key}&session_id=${session}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          media_type: "movie",
          media_id: movie_id,
          favorite: true,
        }),
      }
    );
    setShowNot(true);
    setIsFavorite((prevData) => !prevData);
  }

  function removeFavorite() {
    let movie_id = parseInt(id);
    fetch(
      `https://api.themoviedb.org/3/account/${acc_id}/favorite?api_key=${api_key}&session_id=${session}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          media_type: "movie",
          media_id: movie_id,
          favorite: false,
        }),
      }
    );
    setShowNot(true);
    setIsFavorite((prevData) => !prevData);
  }

  return (
    <div className="bg-slate-800 mb-auto h-full border-2 relative">
      <p className="font-bold text-2xl m-2 text-white">Detalhes</p>
      <div className="p-10 flex">
        <img
          className="rounded-t-lg object-scale-down h-96 w-50 pl-10 pr-10"
          src={imgURL + movie.poster_path}
          alt=""
        />
        <div className="flex flex-col pl-10">
          <p className="font-bold text-xl m-2 text-white">
            Titulo: <span className="font-normal">{movie.title}</span>
          </p>
          <p className="font-bold text-xl m-2 text-white">
            Descrição: <span className="font-normal">{movie.overview}</span>
          </p>
          <p className="font-bold text-xl m-2 text-white">
            Classificação:{" "}
            <span className="font-normal">{movie.vote_average}</span>
          </p>
          <p className="font-bold text-xl m-2 text-white">
            Estreia: <span className="font-normal">{movie.release_date}</span>
          </p>
          <p className="font-bold text-xl m-2 text-white">
            Idioma:{" "}
            <span className="font-normal">{movie.original_language}</span>
          </p>
          {isFavorite ? (
            <button
              onClick={removeFavorite}
              className="border-2 p-2 m-2 rounded-lg text-xl font-bold bg-red-600 ml-40"
            >
              Remover aos Favoritos
            </button>
          ) : (
            <button
              onClick={addFavorite}
              className="border-2 p-2 m-2 rounded-lg text-xl font-bold bg-lime-600 ml-40"
            >
              Adicionar dos Favoritos
            </button>
          )}
          {showNot && (
            <Notification
              text={
                isFavorite
                  ? "Filme Adicionado aos Favoritos"
                  : "Filme Removido dos Favoritos"
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
