import React from "react";

const UpdateAirline = ({ updates, setUpdates, id, isAirlineValid }) => {
  const airline = updates.filter((el) => el.id === id)[0].newAirline;
  let isValidClass = "form-control form-control-sm";

  if (airline !== "") {
    if (isAirlineValid(airline)) {
      isValidClass += " is-valid";
    } else {
      isValidClass += " is-invalid";
    }
  }

  return (
    <input
      value={airline}
      onChange={(e) =>
        setUpdates(
          updates.map((el) => {
            if (el.id === id) {
              el.newAirline = e.target.value;
            }
            return el;
          })
        )
      }
      type="text"
      className={isValidClass}
      placeholder="Redaguoti aviakompaniją"
      id="airline"
    />
  );
};

export default UpdateAirline;
