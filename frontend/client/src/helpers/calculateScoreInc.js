export default function CalculateScoreInc(currentScore , units=0, grams=0) {
    let newScore = currentScore
     if( units ===0 ) {
        newScore = (2 * units) + currentScore
     } else {
        newScore = grams + currentScore
     }
  return newScore;
}


