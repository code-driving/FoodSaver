import { useState } from 'react'

export default function useApplicationData() {
  const [state, setState] = useState({
    products: [],
    recipes: [],
    
  })
  const { products, recipes } = state
  
  
  //in here we will have for now:
  //1.setProduct
  //2.setRecipe
  //3.
}






export default function useApplicationData() {
  const [state, setState] = useState({
    notes: [],
    groceries: [],
    currentCity: ""
  })
  const { notes, groceries, currentCity } = state

  const setGroceries = (value) => {
    setState(prev => ({ ...prev, groceries: [...prev.groceries, value] }))
  }
  const setNotes = (value) => {
    setState(prev => ({ ...prev, notes: [...prev.notes, value] }))
  }
  const setCurrentCity = (value) => {
    setState(prev => ({ ...prev, currentCity: value }))
  }

  return { state, setCurrentCity, setGroceries, setNotes }
}
import { useState, useEffect } from "react";
import axios from "axios";
export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = (day) => setState({ ...state, day });
  // updates spots when appointment is booked or canceled
  const numberOfSpots = (state, day) => {
    const newState = { ...state };
    const specificDay = state.days.find((day) => day.name === state.day);
    const emptyAppointments = specificDay.appointments.filter(
      (appointmentId) => state.appointments[appointmentId].interview === null
    );
    const numberOfSpots = emptyAppointments.length;
    specificDay.spots = numberOfSpots;
    return newState;
  };
  // Cancels an existing interview
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.delete(`/api/appointments/${id}`).then((response) => {
      setState((prev) => {
        const newState = { ...prev, appointments };
        const updatedSpotsState = numberOfSpots(newState);
        return updatedSpotsState;
      });
    });
  }
  // Books a new interview
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        setState((prev) => {
          const newState = { ...prev, appointments };
          const updatedSpotsState = numberOfSpots(newState);
          return updatedSpotsState;
        });
      });
  }
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then(([days, appointments, interviewers]) => {
      setState((prev) => ({
        ...prev,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data,
      }));
    });
  }, []);
  return { state, setDay, bookInterview, cancelInterview, numberOfSpots };
}