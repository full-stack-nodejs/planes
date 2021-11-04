import React from "react";

const UpdateFromTown = ({ updates, setUpdates, id, isTownValid }) => {
  const town = updates.filter((el) => el.id === id)[0].newTown;
  let isValidClass = "form-control form-control-sm";

  if (town !== "") {
    if (isTownValid(town)) {
      isValidClass += " is-valid";
    } else {
      isValidClass += " is-invalid";
    }
  }

  return (
    <input
      value={town}
      onChange={(e) =>
        setUpdates(
          updates.map((el) => {
            if (el.id === id) {
              el.newTown = e.target.value;
            }
            return el;
          })
        )
      }
      type="text"
      className={isValidClass}
      placeholder="Redaguoti miestą"
      id="town"
    />
  );
};

export default UpdateFromTown;
