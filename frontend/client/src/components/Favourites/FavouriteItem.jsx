import { useState, Fragment, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Favourite from "./Favourite.scss";

export default function FavouriteItem(props) {
  const { recipes, deleteRecipe } = props;

  return (
    <>
      <section className="fav-container">
        <div className="fav-item">
          <Link to={`/recipes/${props.recipe_id}`}>
            <ul
              style={{
                color: "orange",
                margin: "1.5rem 0 1.5rem",
                // fontSize: "1.4rem",
              }}
            >
              {props.recipie_name}
            </ul>

            <img
              className="favourite-detail"
              src={props.imagesrc}
              alt={"food image"}
            ></img>
          </Link>
          <button
            className="button"
            style={{ marginTop: "1.5rem" }}
            onClick={() => deleteRecipe(props.recipe_id)}
          >
            delete
          </button>
        </div>
      </section>
    </>
  );
}
