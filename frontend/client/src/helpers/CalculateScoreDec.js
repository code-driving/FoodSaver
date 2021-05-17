export default function CalculateScoreDec(productsState , currentScore) {
    let newScore = currentScore
    let expireditemsgrams=[]
    let expireditemsunits=[]
    let setTrue = []
    for (let i = 0 ; i < productsState.length ; i++) {
        if (productsState[i]['dayLeft'] === "Expired" && productsState[i]['quantity_units'] === 0 && productsState[i]['addedtosummary'] === false){
            expireditemsgrams.push(productsState[i]['quantity_grams'])
            setTrue.push(productsState[i]['id'])
        } else if(productsState[i]['dayLeft'] === "Expired" && productsState[i]['quantity_grams'] === 0 && productsState[i]['addedtosummary'] === false){
            expireditemsunits.push(productsState[i]['quantity_units'])
            setTrue.push(productsState[i]['id'])
        }
    }
    for (let i = 0 ; i < expireditemsgrams.length ; i++) {
        newScore -= expireditemsgrams[i]
    }
    for (let i = 0 ; i < expireditemsunits.length ; i++) {
        newScore -= ( expireditemsunits[i] * 2)
        }

    return {newScore,setTrue};
}


