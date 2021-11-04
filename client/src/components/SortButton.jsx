import React from "react";

const SortButton = ({ requestSort, getClassNamesFor, name }) => {
  return (
    <button onClick={() => requestSort(name)} className="btn btn-dark">
      <i className={`fas fa-${getClassNamesFor(name)}`}></i>
    </button>
  );
};

export default SortButton;
