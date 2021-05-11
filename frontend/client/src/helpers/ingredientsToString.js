default export function ingredientsToString (ingredientsArray) {
let ingredientString = ''
count = 0

for (item of ingredientsArray) {
   count++
   if (count ===  ingredientsArray.length){
     ingredientString += item
   } else {
      ingredientString += item +',+'
   }

}
  return ingredientString 
}