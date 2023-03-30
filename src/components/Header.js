import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [formData, setFormData] = React.useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData(value);
  }

  return (
    <header className="bg-slate-800 flex justify-between border-2 sticky top-0 z-50">
      <Link to="/">
        <p className="border-2 p-2 m-2 rounded-lg text-xl font-bold hover:bg-gray-700 text-white">
          Home
        </p>
      </Link>
      <form className="sm:flex-col">
        <input
          type="text"
          className="flex-auto mt-5 rounded-lg p-1"
          placeholder="Introduzir nome do filme"
          name="searchMovie"
          onChange={handleChange}
        ></input>
        <Link to={`/search/${formData}`}>
          <button className="border-2 rounded-lg ml-1 p-0.5 hover:bg-gray-700 pl-1 pr-1 text-white">
            Procurar
          </button>
        </Link>
      </form>
      <Link to="/favorites">
        <p className="border-2 p-2 m-2 rounded-lg text-xl text-white font-bold hover:bg-gray-700">
          Favoritos
        </p>
      </Link>
    </header>
  );
}
