export default function ingredientsToString(ingredientsArray) {
  let ingredientString = "";
  let count = 0;

  for (let item of ingredientsArray) {
    count++;
    if (count === ingredientsArray.length) {
      ingredientString += item;
    } else {
      ingredientString += item + ",+";
    }
  }
  return ingredientString;
}
