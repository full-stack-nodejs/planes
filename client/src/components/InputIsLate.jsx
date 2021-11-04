import React from "react";

const InputIsLate = ({ isLate, setIsLate }) => {
  return (
    <div>
      <input
        className="form-check-input"
        id="isLate"
        type="checkbox"
        checked={isLate}
        onChange={(e) => setIsLate(e.target.checked ? 1 : 0)}
      />
      <label className="form-check-label" htmlFor="isLate">
        Vėluoja?
      </label>
    </div>
  );
};

export default InputIsLate;
