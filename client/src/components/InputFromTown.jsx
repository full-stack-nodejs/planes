import React from "react";

const InputFromTown = ({ fromTown, setFromTown, isTownValid }) => {
  let isValidClass = "form-control";
  let feedbackClass = "";
  let isValidFeedback = "";

  if (fromTown !== "") {
    if (isTownValid(fromTown)) {
      isValidClass += " is-valid";
      feedbackClass = "valid-feedback";
      isValidFeedback = "Atrodo gerai!";
    } else {
      isValidClass += " is-invalid";
      feedbackClass = "invalid-feedback";
      isValidFeedback = "Nuo 1 iki 64 simbolių";
    }
  }

  return (
    <div>
      <input
        value={fromTown}
        onChange={(e) => setFromTown(e.target.value)}
        type="text"
        className={isValidClass}
        placeholder="Atvyksta iš miesto"
        required
      />
      <div className={feedbackClass}>{isValidFeedback}</div>
    </div>
  );
};

export default InputFromTown;
