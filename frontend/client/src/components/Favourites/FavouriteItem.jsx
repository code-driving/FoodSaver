
import { useState , useEffect } from "react";
import axios from "axios";


export default function FavouriteItem(props) {
const { deleteRecipe } = props

  return (
    <section className='container'>
      <h1> Recipe Details</h1>
    <button onClick={deleteRecipe={deleteRecipe}}>del</button>
  </section>
  )
}
