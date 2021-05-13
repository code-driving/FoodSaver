import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import isAfter from 'date-fns/isAfter'
import roundToNearestMinutes from 'date-fns/roundToNearestMinutes/index'

export default function date(datesobject) {
     
  
      let names = datesobject.map(date=> (date['name']))
      let datearray =  datesobject.map(date=> (date['expiration_date']))
      let parsedDate = []
      
      for (let i = 0 ; i < datearray.length; i++ ) {
        let dateString=''
        let date1 = new Date(datearray[i]);
        let day = date1.getDate();
        let month=date1.getMonth() +1
        let year=date1.getFullYear()
        let timeLeft =formatDistanceToNow(new Date(year, month, day))
        dateString = year+'-'+month+'-'+day
        if (isAfter(new Date(year, month, day), new Date())){
            let object = { name : names[i], expiration : dateString , dayLeft : 'Expired' }
            parsedDate.push(object)
        }else {
            let object = { name : names[i], expiration : dateString , dayLeft : timeLeft }
            parsedDate.push(object)
        }
      }
      return parsedDate
}
  