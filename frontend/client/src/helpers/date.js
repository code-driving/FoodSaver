import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import formatDistance from 'date-fns/formatDistance'
import isAfter from 'date-fns/isAfter'


export default function date(datesobject) {
     
  
      let names = datesobject.map(date=> (date['name']))
      
      let datearray =  datesobject.map(date=> (date['expiration_date']))
      let parsedDate = []
      let now = new Date()
      
      for (let i = 0 ; i < datearray.length; i++ ) {

        let dateString=''
        let date1 = new Date(datearray[i]);
        let day = date1.getDate();
        let month=date1.getMonth() +1
        let year=date1.getFullYear()
        console.log(year, month, day)
        let timeLeft =formatDistance(new Date(year, month-1, day),now)
        console.log('ssssssssss',new Date())
        dateString = year+'-'+month+'-'+day
        if (isAfter(new Date(year, month-1, day), new Date())){
          let object = { name : names[i], expiration : dateString , dayLeft : timeLeft }
          parsedDate.push(object)
        }else {
            let object = { name : names[i], expiration : dateString , dayLeft : 'Expired' }
            parsedDate.push(object)
        }
      }
      return parsedDate
}
  

