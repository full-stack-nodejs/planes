import React, { useState } from "react";
import PlanesAPI from "../apis/PlanesAPI";
import InputArrivalTime from "./InputArrivalTime";
import InputAirline from "./InputAirline";
import InputFromTown from "./InputFromTown";
import InputIsLate from "./InputIsLate";

const AddItem = ({ addPlane, isTownValid, isAirlineValid, isDateTimeValid }) => {
  const [fromTown, setFromTown] = useState("");
  const [airline, setAirline] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [isLate, setIsLate] = useState(0);

  let plane = {
    fromTown,
    airline,
    arrivalTime,
    isLate,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(plane);
    if (
      isTownValid(fromTown) &&
      isAirlineValid(airline) &&
      isDateTimeValid(arrivalTime)
    ) {
      try {
        const response = await PlanesAPI.post("/", plane);
        const id = response.data.insertId;

        if (id > 0) {
          plane.id = id;
          addPlane(plane);

          setFromTown("");
          setAirline("");
          setArrivalTime("");
          setIsLate(0);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="mb-3">
      <form action="" className="row g-3">
      <div className="col-sm-3">
          <InputFromTown
            fromTown={fromTown}
            setFromTown={setFromTown}
            isTownValid={isTownValid}
          />
        </div>
        <div className="col-sm-3">
          <InputAirline
            airline={airline}
            setAirline={setAirline}
            isAirlineValid={isAirlineValid}
          />
        </div>
        <div className="col-sm-4">
          <InputArrivalTime
            arrivalTime={arrivalTime}
            setArrivalTime={setArrivalTime}
            isDateTimeValid={isDateTimeValid}
          />
        </div>
        <div className="col-sm-1">
          <InputIsLate
            isLate={isLate}
            setIsLate={setIsLate}
          />
        </div>
        <div className="col-sm-1">
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary"
          >
            Pridėti
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddItem;
