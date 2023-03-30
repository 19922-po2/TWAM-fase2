import React from "react";
import Movie from "./Movie.js";

export default function Main() {
  const api_key = "402cb8ff234f7b3f771274adb84a91ec";
  const acc_id = "12050039";
  const session = "14283219cfca96d2c0b5102fcc46a64b8b401506";
  const imgURL = "https://image.tmdb.org/t/p/original";

  const [allMovies, setAllMovies] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);

  //fetch top 20 movies
  React.useEffect(function () {
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((data) => setAllMovies(data.results));
  }, []);

  //fetch favorites
  React.useEffect(function () {
    fetch(
      `https://api.themoviedb.org/3/account/${acc_id}/favorite/movies?api_key=${api_key}&language=en-US&sort_by=created_at.asc&page=1&session_id=${session}`
    )
      .then((res) => res.json())
      .then((data) => setFavorites(data.results));
  }, []);

  //verifies if the movie is favorite or not
  function isFavorite(id) {
    for (const fav of favorites) {
      if (id == fav.id) {
        return true;
      }
    }
  }

  //creater each movie card
  let movies = allMovies.map((element) => (
    <Movie
      key={element.id}
      id={element.id}
      title={element.title}
      img={imgURL + element.backdrop_path}
      vote={element.vote_average}
      favorite={isFavorite(element.id)}
    />
  ));

  //console.log(movies)
  return (
    <div className="bg-slate-800 mb-auto h-full border-2 relative">
      <p className="font-bold text-2xl m-2 text-white">Filmes em destaque</p>
      <div className="flex flex-wrap justify-around bg-slate-800 mb-72">{movies}</div>
    </div>
  );
}
