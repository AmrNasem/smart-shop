import React, { useState } from "react";
import Modal from "../UI/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import classes from "./Search.module.css";

const Search = ({ handleClosure, closing }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Modal
      closing={closing}
      onClick={handleClosure}
      style={{ backgroundColor: "var(--search-background)" }}
      className={`py-2 px-3 top-0 start-0 w-100 ${
        closing ? classes["list-up"] : classes["list-down"]
      }`}
    >
      <button
        onClick={handleClosure}
        className="btn align-self-start border-0 my-2"
      >
        <FontAwesomeIcon icon={faClose} />
      </button>
      <form onSubmit={handleSubmit} className="w-75 mx-auto my-5">
        <label htmlFor="search" className="fw-semibold mb-2">
          عن ماذا تبحث؟
        </label>
        <div className="d-flex align-items-center border-bottom border-white gap-2">
          <input
            className="flex-grow-1 bg-transparent p-2 outline-none border-0"
            type="text"
            id="search"
            value={searchQuery}
            placeholder="اكتب كلمة للبحث.."
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="text-white btn p-1">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default Search;
