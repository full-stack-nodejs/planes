import React from "react";

const UpdateIsLate = ({ updates, setUpdates, id }) => {
  return (
    <input
      className="form-check-input"
      type="checkbox"
      checked={updates.filter((el) => el.id === id)[0].newIsLate}
      onChange={(e) => {
        setUpdates(
          updates.map((el) => {
            if (el.id === id) {
              el.newIsLate = e.target.checked;
            }
            return el;
          })
        );
      }}
      id="isLate"
    />
  );
};

export default UpdateIsLate;
