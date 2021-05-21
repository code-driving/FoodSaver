import { useState, Fragment, useEffect, PureComponent } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Popup from "../Products/popup";
import Favourite from "./Favourite.scss";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function FavouriteItem(props) {
  const { recipes, deleteRecipe } = props;

  const options = {
    title: "Title",
    message: "Message",
    buttons: [
      {
        label: "Yes",
        onClick: () => alert("Click Yes"),
      },
      {
        label: "No",
        onClick: () => alert("Click No"),
      },
    ],
    childrenElement: () => <div />,
    customUI: ({ onClose }) => (
      <div>
        <h3 style={{ marginLeft: "2.5rem", color: "orange" }}>
          {"Are you sure?"}
        </h3>
        <button
          className="button"
          style={{ marginTop: "1.5rem" }}
          onClick={() => onClose()}
        >
          cancel
        </button>
        <button
          className="button"
          style={{ marginTop: "1.5rem", marginLeft: "3rem" }}
          onClick={() => {
            deleteRecipe(props.recipe_id);
            onClose();
          }}
        >
          delete
        </button>
      </div>
    ),
    closeOnEscape: true,
    closeOnClickOutside: true,
    willUnmount: () => {},
    afterClose: () => {},
    onClickOutside: () => {},
    onKeypressEscape: () => {},
    overlayClassName: "overlay-custom-class-name",
  };

  return (
    <>
      <section className="fav-container">
        <div className="fav-item">
          <Link to={`/recipes/${props.recipe_id}`}>
            <ul
              style={{
                color: "orange",
                margin: "1.5rem 0 1.5rem",
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
            onClick={() => confirmAlert(options)}
          >
            delete
          </button>
        </div>
      </section>
    </>
  );
}
