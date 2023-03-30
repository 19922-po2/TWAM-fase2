import React from "react";
import { Link } from "react-router-dom";
import heart from "./heart_fill.png";

export default function Movie(props) {
  let isfav = (props.favorite ? true : false)

  return (
    <Link
      to={`/details/${props.id}`} state={{ fav: isfav }}
    >
      <div className="flex justify-center mt-4">
        <div className="rounded-lg shadow-lg bg-white max-w-sm hover:bg-gray-400">
          <p href="#!">
            <img className="rounded-t-lg" src={props.img} alt="" />
          </p>
          <div className="p-3">
            <h5 className="text-gray-900 text-l font-medium mb-2">
              {props.title}
            </h5>
            <div className="flex">
              <h5 className="text-gray-900 text-m font-small mb-2">
                Classificação: {props.vote}
              </h5>
              {props.favorite && (
                <img className="w-6 h-6 ml-auto" src={heart}></img>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
