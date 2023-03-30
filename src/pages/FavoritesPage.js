import React from "react";
import Movie from "../components/Movie.js";

export default function FavoritesPage() {
  //API info
  const api_key = "402cb8ff234f7b3f771274adb84a91ec";
  const acc_id = "12050039";
  const session = "14283219cfca96d2c0b5102fcc46a64b8b401506";
  const imgURL = "https://image.tmdb.org/t/p/original";

  const [allMovies, setAllMovies] = React.useState([]);

  React.useEffect(function () {
    fetch(
      `https://api.themoviedb.org/3/account/${acc_id}/favorite/movies?api_key=${api_key}&language=en-US&sort_by=created_at.asc&page=1&session_id=${session}`
    )
      .then((res) => res.json())
      .then((data) => setAllMovies(data.results));
  }, []);

  let movies = allMovies.map((element) => (
    <Movie
      key={element.id}
      id={element.id}
      title={element.title}
      img={imgURL + element.backdrop_path}
      vote={element.vote_average}
      favorite={true}
    />
  ));

  return (
    <div className="bg-slate-800 mb-auto h-full border-2 relative">
      <p className="font-bold text-2xl m-2 text-white">Favoritos</p>
      <div className="flex flex-wrap justify-around bg-slate-800">{movies}</div>
    </div>
  );
}
