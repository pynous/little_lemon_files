import React, { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import BookingForm from "./BookingForm";

// Mock API scripts often provided by Coursera capstone starter
const seededRandom = function (seed) {
  var m = 2**35 - 3;
  var a = 185852;
  var s = seed % m;
  return function () {
    return (s = s * a % m) / m;
  };
}

const fetchAPI = function(date) {
  let result = [];
  let random = seededRandom(new Date(date).getDate());
  for(let i = 17; i <= 23; i++) {
    if(random() < 0.5) {
      result.push(i + ":00");
    }
    if(random() < 0.5) {
      result.push(i + ":30");
    }
  }
  return result;
};

const submitAPI = function(formData) {
  return true;
};

const updateTimes = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TIMES':
      return fetchAPI(new Date(action.date));
    default:
      return state;
  }
};

const initializeTimes = () => {
  const today = new Date();
  return fetchAPI(today);
};

function Main() {
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);
  const navigate = useNavigate();

  const submitForm = (formData) => {
    if (submitAPI(formData)) {
      navigate("/confirmed");
    }
  };

  return (
    <main>
      <BookingForm
        availableTimes={availableTimes}
        dispatch={dispatch}
        submitForm={submitForm}
      />
    </main>
  );
}

export default Main;
