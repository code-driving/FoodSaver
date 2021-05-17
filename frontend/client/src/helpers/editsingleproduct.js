import datefunction from "./date"

export default function EditSingleProduct(res,state,setState) {
     const product_id =res['data'][0]['id']
      const dateData = datefunction([res['data'][0]]);
      const parseddata = dateData[0];

      const combined = {
        ...res['data'][0],
        expiration: parseddata.expiration,
        dayLeft: parseddata.dayLeft,
      };

      let deletedState =[];
      
      for (let i = 0; i < state.products.length ; i++) {
        if(state.products[i]['id'] != product_id ){
          deletedState.push(state.products[i])
        }
      }
    const combinedState = [...deletedState, combined ]
      setState((prev) => ({ ...prev, products: combinedState }));
}