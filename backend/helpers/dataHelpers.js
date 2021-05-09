const getProductsByUsers = (usersProducts) => {
  const productsByUsers = {};

  for (let product of usersProducts) {
      if (!productsByUsers[product.user_id]) {
          productsByUsers[product.user_id] = {
              userId: product.user_id,
              name: product.name,
              email: product.email,
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
          quantity_unit : product.quantity_unit
      });


  }

  return Object.values(productsByUsers);
};

const AppendRecipes = (savedRecipe,formattedProducts) => {
  
  console.log('inside')
  for (let productsobject of formattedProducts) {
     for (let recipe of savedRecipe) {
       if (productsobject.userId === recipe.user_id)
       productsobject['recipes'].push({
        recipie_name: recipe.recipie_name,
        recipe_id: recipe.recipe_id
       })
     }
  }
  console.log(newformattedProducts)
  return formattedProducts
};



module.exports = {
  getProductsByUsers,
  AppendRecipes
};


///api/products

// [{id:1,name:asdasd,products:[{id,name,expirationdate,quantites_of_individual_ingrede}],recipes[id],summary},
// {id:1,name:asdasd,products:[id,name,expirationdate]},

// ]

///api/savedrecipies
//[id: {recipes}]

//api/quanties
// [productid :[qun]]