import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

// import "index.scss";
<<<<<<< HEAD

import RecipeList from "../components/Recipes/RecipeList";
import RecipeItem from "../components/Recipes/RecipeItem";

export const RecipeListComponent = () => <RecipeList />
export const RecipeItemComponent = () => <RecipeItem />
=======
import Recipes from "../components/Recipes"
import RecipeList from "../components/Recipes/RecipeList";
import RecipeItem from "../components/Recipes/RecipeItem";

export const RecipesComponent = () => <Recipes />
export const RecipeListComponent = () => <RecipeList />
export const RecipeItemComponent = () => <RecipeItem />

export default {
  title: "Components/Recipes",
  component: Recipes
};
>>>>>>> 6c0341075e61592c2e7f4dda8902cd17379a5b30
