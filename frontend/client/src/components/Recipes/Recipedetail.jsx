import { useState } from 'react'
import useRecipeDetails from '../../hooks/useRecipeDetails'


//this is the component responsible for handling data (recipes) received from api call. Create a useRecipeData hook to fetch the data (axios request)
//we will need onSubmit as a prop to handle recipe submit event. This could be a button in RecipeList

export default function RecipeDetail(props) {

  let recipie_id = props.match.params.id
  const recipeDetails  = useRecipeDetails(recipie_id)
 
  let steps = []
  steps = recipeDetails.steps[0]['steps']
  let img =recipeDetails.info['image']
  
  console.log('aaaaaaaa',recipeDetails)
  // if(recipeDetails.length > 0 ) {
  //   console.log('bbbbbbbb',recipeDetails)
  //   // steps = recipeDetails[0]['steps']
  // }

  const EachStep= steps.map((step, index) => {return <li key={index}>{step.step}</li>})
  
  return (
    <section>
     Details
     <img src={img} alt={"food image"}></img>
    <ul>
      <li>test</li>
      {EachStep}
    </ul> 
   </section>
  )
}