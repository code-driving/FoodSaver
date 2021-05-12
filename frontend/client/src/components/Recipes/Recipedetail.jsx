import { useState } from 'react'
import useRecipeDetails from '../../hooks/useRecipeDetails'


//this is the component responsible for handling data (recipes) received from api call. Create a useRecipeData hook to fetch the data (axios request)
//we will need onSubmit as a prop to handle recipe submit event. This could be a button in RecipeList

export default function RecipeDetail(props) {
  const [ details, setDetails ] = useState()
  let recipie_id = props.match.params.id
  const recipeDetails  = useRecipeDetails(recipie_id)
 
  let steps = []
  
  if(recipeDetails.length > 0 ) {
    steps = recipeDetails[0]['steps']
  }

  const EachStep= steps.map((step, index) => {return <li key={index}>{step.step}</li>})
  
  return (
    <section>
     Details
 
    <ul>
      <li>test</li>
      {EachStep}
    </ul> 
 
      {/* <h1>{recipeDetails && recipeDetails[0]['steps'][0]['step']}</h1> */}
  
    </section>
  )
}