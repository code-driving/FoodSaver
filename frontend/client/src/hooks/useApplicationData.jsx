import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import datefunction from "../helpers/date";

export default function useApplicationData() {
  const [state, setState] = useState({
    users: [],
    products: [],
    recipes: [],
    summary: [],
    //keep track of the expired and saved products
    // score: 100
  });

  const localId = localStorage.getItem("token");

  const setProduct = (value) => {
    return axios.post(`/api/products/`, value).then((response) => {
      console.log("sssssss", response.data);
      const dateData = datefunction([response.data]);
      console.log("wwwwwww", dateData[0]);
      const parseddata = dateData[0];
      const combined = {
        ...response.data,
        expiration: parseddata.expiration,
        dayLeft: parseddata.dayLeft,
      };
      console.log("qqqqqq", combined);

      setState((prev) => ({ ...prev, products: [...prev.products, combined] }));
    });
  };

  const deleteProduct = (ids) => {
    const deletes = [];
    for (const id of ids) {
      deletes.push(axios.delete(`/api/products/${id}`));
    }
    Promise.all(deletes).then((res) => {
      const del = state.products.filter((product) => !ids.includes(product.id));
      setState((prev) => ({ ...prev, products: del }));
    });
  };

  const setRecipe = (value) => {
    return axios.post(`/api/recipes/`, value).then((response) => {
      setState((prev) => ({
        ...prev,
        recipes: [...prev.recipes, response.data],
      }));
    });
  };

  const deleteRecipe = (id) => {
    console.log("test");
    return axios.delete(`/api/recipes/${id}`).then((res) => {
      console.log("id from delete", id);
      const del = state.recipes.filter((recipe) => recipe.id !== id);
      setState((prev) => ({ ...prev, recipes: del }));
    });
  };

  const consumeProduct = (id) => {
    console.log("product consumed", id);
  };
  // const deleteRecipe = (ids) => {
  //   console.log('ids from delete recipe', ids)
  //   const deletes = []
  //     for (const id of ids) {
  //       deletes.push(
  //         axios
  //           .delete(`/api/recipes/${id}`)
  //       )
  //     }
  //     Promise.all(deletes)
  //     .then(res => {
  //       const del = state.recipes.filter(recipe => ![ids].includes(recipe.id))
  //       setState(prev => ({ ...prev, recipes: del}))
  //     })
  // }

  //We should not use localId at the end of each endpoint!
  useEffect(() => {
    Promise.all([
      axios.get(`/api/users`),
      axios.get(`/api/products/${localId}`),
      axios.get(`/api/recipes/${localId}`),
      axios.get(`/api/summary`),
    ]).then(([users, products, recipes, summary]) => {
      const dateData = datefunction(products.data);
      for (let i = 0; i < products.data.length; i++) {
        products.data[i]["expiration"] = dateData[i]["expiration"];
        products.data[i]["dayLeft"] = dateData[i]["dayLeft"];
      }

      setState((prev) => ({
        ...prev,
        users: users.data,
        products: products.data,
        recipes: recipes.data,
        summary: summary.data,
      }));
    });
  }, []);

  return {
    state,
    setProduct,
    deleteProduct,
    setRecipe,
    deleteRecipe,
    consumeProduct,
  };

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
