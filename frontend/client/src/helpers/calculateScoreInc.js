export default function CalculateScoreInc(currentScore , units, grams) {
    let newScore = currentScore
    let units1 = Number(units) || 0
    let grams1 = Number(grams) || 0
   
     if( grams1 === 0 ) {
        newScore = (2 * units1) + currentScore
     } else if (units1 === 0){
        newScore =  currentScore + grams1 
     }
   
  return newScore;
}


