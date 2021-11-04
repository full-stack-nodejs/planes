import React from "react";

const UpdateDate = ({ updates, setUpdates, id, isDateTimeValid }) => {
  const date = updates.filter((el) => el.id === id)[0].newDate;
  let isValidClass = "form-control form-control-sm";

  if (date !== "") {
    if (isDateTimeValid(date)) {
      isValidClass += " is-valid";
    } else {
      isValidClass += " is-invalid";
    }
  }

  return (
    <input
      value={date}
      onChange={(e) =>
        setUpdates(
          updates.map((el) => {
            if (el.id === id) {
              el.newDate = e.target.value;
            }
            return el;
          })
        )
      }
      type="text"
      className={isValidClass}
      placeholder="Naujas atvykimo laikas"
      id="arrivalTime"
    />
  );
};

export default UpdateDate;
