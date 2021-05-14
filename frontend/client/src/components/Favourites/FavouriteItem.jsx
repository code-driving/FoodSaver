
import { useState , useEffect } from "react";
import axios from "axios";


export default function FavouriteItem(props) {
const { deleteRecipe } = props

  return (
    <section>
      <h1>Recipe Details</h1>
      <ul>{props.recipie_name}</ul>
      <button>del</button>
  </section>
  )
}
