<<<<<<< HEAD
=======
// const { getMaxListeners } = require("node:process");

>>>>>>> 6c0341075e61592c2e7f4dda8902cd17379a5b30
const getProductsByUsers = (usersProducts) => {
  const productsByUsers = {};
  for (let product of usersProducts) {
<<<<<<< HEAD
      if (!productsByUsers[product.user_id]) {
          productsByUsers[product.user_id] = {
              user_Id: product.user_id,
              name: product.name,
              email: product.email,
              score:product.score,
              products: [],
              recipes:[],
              summary:[]
          };
      }

      productsByUsers[product.user_id].products.push({
          product_id : product.product_id,
          name: product.product_name,
          expiration_date : product.expiration_date,
          quantity_grams: product.quantity_grams,
          quantity_unit : product.quantity_units
          
      });


=======
    if (!productsByUsers[product.user_id]) {
      productsByUsers[product.user_id] = {
        userId: product.user_id,
        name: product.name,
        email: product.email,
        products: [],
      };
    }

    productsByUsers[product.user_id].products.push({
      name: product.name,
      expiration_date: product.expiration_date,
    });
>>>>>>> 6c0341075e61592c2e7f4dda8902cd17379a5b30
  }

  return Object.values(productsByUsers);
};

<<<<<<< HEAD
const AppendRecipes = (savedRecipe,formattedProducts) => {
  
  for (let productsobject of formattedProducts) {
     for (let recipe of savedRecipe) {
       if (productsobject.user_Id === recipe.user_id)
        productsobject['recipes'].push({
        recipie_name: recipe.recipie_name,
        recipe_id: recipe.recipe_id
       })
     }
  }
  return formattedProducts
};

const AppendSummary = (Summaries,combinedData) => {
 
  for (let productsobject of combinedData) {
     for (let summary of Summaries) {
       if (productsobject.user_Id === summary.user_id) {
          productsobject['summary'].push({
          id: summary.id,
          name: summary.name,
          grams_wasted: summary.grams_wasted,
          units_wasted: summary.units_wasted,
          grams_saved: summary.grams_saved,
          units_saved: summary.units_saved,
          product_id: summary.product_id
          })
        }
      }
  }
  return combinedData
};





module.exports = {
  getProductsByUsers,
  AppendRecipes,
  AppendSummary
};

=======
module.exports = {
  getProductsByUsers,
};

// 1 : {
//   userid:1,
//   name:getMaxListeners
//   email:asd@getMaxListeners,
//   products: [
//     potatos : {
//       quantity:2,
//     },
//     tomatos,
//     cheese
//   ],
//   recipes:{}
// }
>>>>>>> 6c0341075e61592c2e7f4dda8902cd17379a5b30
