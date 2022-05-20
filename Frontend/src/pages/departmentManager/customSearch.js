import React, { useState } from "react";

const CustomSearch = (props) => {
  const handleChange = (event) => {
    sessionStorage.setItem("departmentsearch", event.target.value);
  };
  const [showResults, setShowResults] = React.useState(false);
  return (
    <nav className="navbar navbar-light bg-light">
      <form className="form-inline">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(event) => handleChange(event)}
        />
        <p
          className="btn btn-outline-success my-2 my-sm-0"
          onClick={() =>
            props.handleSearch(
              sessionStorage.getItem("departmentsearch"),
              setShowResults(true)
            )
          }
        >
          Search
        </p>
        <p
          className="btn btn-outline-success my-2 my-sm-0"
          onClick={props.openCreateModal}
        >
          Add
        </p>
        {showResults ? (
          <p
            className="btn btn-outline-success my-2 my-sm-0"
            onClick={() => props.onClickBack(setShowResults(false))}
          >
            Trở lại
          </p>
        ) : null}
      </form>
    </nav>
  );
};

export default CustomSearch;
