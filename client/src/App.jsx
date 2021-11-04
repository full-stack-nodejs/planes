import React, { useState } from "react";
import AddItem from "./components/AddItem";
import Header from "./components/Header";
import ItemsList from "./components/ItemsList";

const App = () => {
  const [planes, setPlanes] = useState([]);
  const [updates, setUpdates] = useState([]);

  const addPlane = (plane) => {
    const update = {
      id: plane.id,
      fromTown: "",
      airline: "",
      arrivalTime: "",
    };
    setUpdates([update, ...updates]);
    setPlanes([plane, ...planes]);
  };

  const isTownValid = (town) => {
    let len = 0;

    if (town !== undefined) {
      len = town.length;
    }

    if (len > 0 && len <= 64) {
      return true;
    }
    return false;
  };

  const isAirlineValid = (airline) => {
    let len = 0;

    if (airline !== undefined) {
      len = airline.length;
    }

    if (len > 0 && len <= 32) {
      return true;
    }
    return false;
  };

  const isDateTimeValid = (dateTime) => {
    let dateArr = [];

    if (dateTime !== undefined) {
      dateArr = dateTime.split(" ");
    }

    if (dateArr.length > 0 && isDateValid(dateArr[0]) && isTimeValid(dateArr[1])) {
      return true;
    }
    return false;
  };

  const isDateValid = (date) => {
    const len = date.length;
    const dateArr = date.split("-");
    const yyyy = parseInt(dateArr[0]);
    const mm = parseInt(dateArr[1]);
    const dd = parseInt(dateArr[2]);
    // Create list of days of a month [assume there is no leap year by default]
    const ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (
      len === 10 &&
      yyyy > 2020 &&
      yyyy < 2199 &&
      mm > 0 &&
      mm <= 12 &&
      dd > 0
    ) {
      if (mm !== 2) {
        return dd <= ListofDays[mm - 1];
      } else {
        // if leap year
        if ((!(yyyy % 4) && yyyy % 100) || !(yyyy % 400)) {
          return dd <= 29;
        } else {
          return dd <= 28;
        }
      }
    }
    return false;
  };

  const isTimeValid = (time) => {
    return true;
  };

  return (
    <div className="container">
      <Header />
      <AddItem
        addPlane={addPlane}
        isTownValid={isTownValid}
        isAirlineValid={isAirlineValid}
        isDateTimeValid={isDateTimeValid}
      />
      <ItemsList
        planes={planes}
        setPlanes={setPlanes}
        updates={updates}
        setUpdates={setUpdates}
        isTownValid={isTownValid}
        isAirlineValid={isAirlineValid}
        isDateTimeValid={isDateTimeValid}
      />
    </div>
  );
};

export default App;
