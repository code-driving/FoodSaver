// const { getMaxListeners } = require("node:process");

const getProductsByUsers = (usersProducts) => {
  const productsByUsers = {};

  for (let product of usersProducts) {
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
          expiration_date : product.expiration_date
      });

  }

  return Object.values(productsByUsers);
};

module.exports = {
  getProductsByUsers
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