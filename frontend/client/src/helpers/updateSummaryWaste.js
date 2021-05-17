import CalculateScoreDec from "./CalculateScoreDec";
import axios from "axios";
import useApplicationData from "../hooks/useApplicationData" 
 
// const {updateUser} = useApplicationData

// export default function updateSummaryWaste() {
// console.log('yyyyyyyyyyyyyyyy5555555555555555')
    // if (state.users.length > 0) {
    //     let IdAndScore = CalculateScoreDec(state['products'],state['users'][0]['score'])
    //     console.log(IdAndScore)
    //     let userdata={ score:IdAndScore.newScore, user_id:user_id}
    //     updateUser(userdata)
    //     let productIDs=IdAndScore.setTrue
    //    console.log('pppppppppppppppppppppp')
    //     //Run Request in parallel and marks as added to summary true
    //     let returndata = [];
    //     let promises = [];
    //     for (let i = 0; i < productIDs.length ; i++){
    //       promises.push(axios.put(`/api/products/Boolean`, {product_id:productIDs[i]} ).then((res) => {
    //         returndata.push(res);
    //        })
    //      )  
    //     }
  
    //     Promise.all(promises).then(() => { 
    //       console.log('Done',promises)
    //     })
        
    //     let summaryobject =IdAndScore.objectarray;
    //     console.log('222222222222222222',summaryobject)
        // Add wasted to summary
        // name, user[0][name]
        // user_id, =localID
        // product_id,productIDs[i]}
        // grams_wasted,
        // units_wasted = 
  
        // let returndata = [];
        // let promises = [];
        // for (let j = 0; j < productIDs.length ; j++){
        //   promises.push(axios.put(`/api/summary/waste`, {product_id:productIDs[i]} ).then((res) => {
        //     returndata.push(res);
        //    })
        //  )  
        // }
  
//     // }
// }
  