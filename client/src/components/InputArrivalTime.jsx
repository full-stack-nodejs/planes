import React from "react";

const InputArrivalTime = ({ arrivalTime, setArrivalTime, isDateTimeValid }) => {
  let isValidClass = "form-control";
  let feedbackClass = "";
  let isValidFeedback = "";

  if (arrivalTime !== "") {
    if (isDateTimeValid(arrivalTime)) {
      isValidClass += " is-valid";
      feedbackClass = "valid-feedback";
      isValidFeedback = "Atrodo gerai!";
    } else {
      isValidClass += " is-invalid";
      feedbackClass = "invalid-feedback";
      isValidFeedback = "Pvz., 2021-09-01 10:20";
    }
  }

  return (
    <div>
      <input
        value={arrivalTime}
        onChange={(e) => setArrivalTime(e.target.value)}
        type="text"
        className={isValidClass}
        placeholder="Atvykimo laikas, pvz., 2021-09-01 10:20"
        required
      />
      <div className={feedbackClass}>{isValidFeedback}</div>
    </div>
  );
};

export default InputArrivalTime;
