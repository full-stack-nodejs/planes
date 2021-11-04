import React from "react";

const InputAirline = ({ airline, setAirline, isAirlineValid }) => {
  let isValidClass = "form-control";
  let feedbackClass = "";
  let isValidFeedback = "";

  if (airline !== "") {
    if (isAirlineValid(airline)) {
      isValidClass += " is-valid";
      feedbackClass = "valid-feedback";
      isValidFeedback = "Atrodo gerai!";
    } else {
      isValidClass += " is-invalid";
      feedbackClass = "invalid-feedback";
      isValidFeedback = "Nuo 1 iki 32 simbolių";
    }
  }

  return (
    <div>
      <input
        value={airline}
        onChange={(e) => setAirline(e.target.value)}
        type="text"
        className={isValidClass}
        placeholder="Aviakompanija"
        required
      />
      <div className={feedbackClass}>{isValidFeedback}</div>
    </div>
  );
};

export default InputAirline;
