export default function CalculateScoreDec(productsState , currentScore) {
    let newScore = currentScore
    let expireditemsgrams=[]
    let expireditemsunits=[]
    for (let i = 0 ; i < productsState.length ; i++) {
        if (productsState[i]['dayLeft'] === "Expired" && productsState[i]['quantity_units'] === 0){
            expireditemsgrams.push(productsState[i]['quantity_grams'])
        } else if(productsState[i]['dayLeft'] === "Expired" && productsState[i]['quantity_grams'] === 0){
            expireditemsunits.push(productsState[i]['quantity_units'])
        }
    }

    for (let i = 0 ; i < expireditemsgrams.length ; i++) {
      newScore -= expireditemsgrams[i]
    }

    for (let i = 0 ; i < expireditemsunits.length ; i++) {
        newScore -= ( expireditemsunits[i] * 2)
      }

    return newScore;
}


