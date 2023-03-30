import React from "react";
import { useParams } from "react-router-dom";
import Movie from "../components/Movie.js";

//** Images */
export default function SearchPage(props) {
  const api_key = "402cb8ff234f7b3f771274adb84a91ec";
  const acc_id = "12050039";
  const session = "14283219cfca96d2c0b5102fcc46a64b8b401506";
  const imgURL = "https://image.tmdb.org/t/p/original";
  // gets the search value from the user
  let { name } = useParams();
  // states
  const [allMovies, setAllMovies] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);

  //fetch movies with the search term
  React.useEffect(function () {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${name}&page=1&include_adult=false`
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

  //console.log(allMovies);
  //removes invalid movies
  for (const movie of allMovies) {
    const index = allMovies.indexOf(movie);
    if (
      imgURL + movie.backdrop_path ==
        "https://image.tmdb.org/t/p/originalnull" ||
      imgURL + movie.backdrop_path ==
        "https://image.tmdb.org/t/p/originalundefined" ||
      movie.backdrop_path === null ||
      movie.vote_average < 1
    ) {
      allMovies.splice(index, 1);
    }
  }
  console.log(allMovies.length);
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
  console.log(allMovies.length);
  return (
    <div className="bg-slate-800 mb-auto h-full border-2 relative">
      <p className="font-bold text-2xl m-2 text-white">Resultado da Pesquisa</p>
      <div className="flex flex-wrap justify-around bg-slate-800 text-white mt-11">
        {movies.length ? movies : "Sem resultados"}
      </div>
    </div>
  );
}
