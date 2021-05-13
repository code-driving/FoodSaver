import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

export default function useApplicationData() {
  const [state, setState] = useState({
    users: [],
    products: [],
    recipes: [],
    summary: [],
    favourites: []
     //keep track of the expired and saved products
    // score: 100
  });

  const localId = localStorage.getItem("token");
  
  const setProduct = (value) => {

    return axios
      .post(`/api/products/`, value)
      .then((response) => {
        setState(prev => ({ ...prev, products: [...prev.products, response.data] }))
    });
  }
  
  const deleteProduct = (ids) => {
    
    const deletes = []
      for (const id of ids) {
        deletes.push(
          axios
            .delete(`/api/products/${id}`)
        )
      }
      Promise.all(deletes)
      .then(res => {
        const del = state.products.filter(product => !ids.includes(product.id))
        setState(prev => ({ ...prev, products: del}))
      })
  }
  
  // const setExpired = (ids) => {
  //   //keep the state of the expired products 
  //   //if the product is expired = add class to signify 
  //   //send a post request to summary
  //   //update the state 
  //   const expired = state.products.find(product => ids.includes(product.id) && product.expiration_date < Date.now())
  //   expired.classList.add('red')
  //   return axios
  //     .post(`/api/summary`, expired)
  //     .then((response) => {
  //       // setState(prev => ({ ...prev, products: [...prev.products, response.data]}))
  //       console.log(response)
  //     })
  // }

  const setRecipe = (value) => {
    
    return axios
      .post(`/api/recipes/`, value)
      .then((response) => {
        setState(prev => ({ ...prev, products: [...prev.products, response.data] }))
    });
  }
  
  const deleteRecipe = (ids) => {
    const deletes = []
      for (const id of ids) {
        deletes.push(
          axios
            .delete(`/api/recipes/${id}`)
        )
      }
      Promise.all(deletes)
      .then(res => {
        const del = state.recipes.filter(recipe => !ids.includes(recipe.id))
        setState(prev => ({ ...prev, products: del}))
      })
  }
  

//We should not use localId at the end of each endpoint!
  useEffect(() => {
    Promise.all([
      axios.get(`/api/users`),
      axios.get(`/api/products/${localId}`),
      axios.get(`/api/recipes`),
      axios.get(`/api/summary`),
    ]).then(([users, products, recipes, summary]) => {
      setState((prev) => ({
        ...prev,
        users: users.data,
        products: products.data,
        recipes: recipes.data,
        summary: summary.data,
      }))
    });
  }, []);


  return { state, setProduct, deleteProduct };
  // ? create a function to keep track of the Score

  //3.setRecipe
  //4.deleteRecipe
  //use Axios request to create or delete

  //6. create handleIncrement, handleDecrement, handleReset to update the score based on the product_saved, product_expired
  //IF SCORE == 0 THEN HE WILL HAVE TO DONATE TO FOODBANK AND HAVE A POSSIBILITY TO RESET A SCORE
}

// setState(prev => ({ ...prev, products: res.data})) /// the magic to remove everything




//   return { state, setCurrentCity, setGroceries, setNotes };
// }
// import { useState, useEffect } from "react";
// import axios from "axios";
// export default function useApplicationData() {
//   const [state, setState] = useState({
//     day: "Monday",
//     days: [],
//     appointments: {},
//     interviewers: {},
//   });
//   const setDay = (day) => setState({ ...state, day });
//   // updates spots when appointment is booked or canceled
//   const numberOfSpots = (state, day) => {
//     const newState = { ...state };
//     const specificDay = state.days.find((day) => day.name === state.day);
//     const emptyAppointments = specificDay.appointments.filter(
//       (appointmentId) => state.appointments[appointmentId].interview === null
//     );
//     const numberOfSpots = emptyAppointments.length;
//     specificDay.spots = numberOfSpots;
//     return newState;
//   };

//   // Cancels an existing interview
//   function cancelInterview(id) {
//     const appointment = {
//       ...state.appointments[id],
//       interview: null,
//     };
//     const appointments = {
//       ...state.appointments,
//       [id]: appointment,
//     };
//     return axios.delete(`/api/appointments/${id}`).then((response) => {
//       setState((prev) => {
//         const newState = { ...prev, appointments };
//         const updatedSpotsState = numberOfSpots(newState);
//         return updatedSpotsState;
//       });
//     });
//   }
//   // Books a new interview
//   function bookInterview(id, interview) {
//     const appointment = {
//       ...state.appointments[id],
//       interview: { ...interview },
//     };
//     const appointments = {
//       ...state.appointments,
//       [id]: appointment,
//     };
//     return axios
//       .put(`/api/appointments/${id}`, { interview })
//       .then((response) => {
//         setState((prev) => {
//           const newState = { ...prev, appointments };
//           const updatedSpotsState = numberOfSpots(newState);
//           return updatedSpotsState;
//         });
//       });
//   }
//   useEffect(() => {
//     Promise.all([
//       axios.get("/api/days"),
//       axios.get("/api/appointments"),
//       axios.get("/api/interviewers"),
//     ]).then(([days, appointments, interviewers]) => {
//       setState((prev) => ({
//         ...prev,
//         days: days.data,
//         appointments: appointments.data,
//         interviewers: interviewers.data,
//       }));
//     });
//   }, []);
//   return { state, setDay, bookInterview, cancelInterview, numberOfSpots };
// }

// this.state = {
//   counters: [
//     { id: 1, value: 0 },
//     { id: 2, value: 0 },
//     { id: 3, value: 0 },
//     { id: 4, value: 0 },
//     { id: 5, value: 0 },
//   ],
//   total: 0,
// };
// handleIncrement(counter) {
//   const total = this.state.total + 1;
//   const counters = [...this.state.counters];
//   const index = counters.indexOf(counter);
//   counters[index] = { ...counter };
//   counters[index].value++;
//   this.setState({ counters: counters, total: total });
// }

// handleDecrement(counter) {
//   const total = this.state.total - 1;
//   const counters = [...this.state.counters];
//   const index = counters.indexOf(counter);
//   counters[index] = { ...counter };
//   counters[index].value--;
//   this.setState({ counters: counters, total: total });
// }
// handleReset() {
//   const total = 0;
//   const counters = this.state.counters.map(c => {
//       c.value = 0;
//       return c;
//   });
//   this.setState({ counters: counters, total: total });
// }
