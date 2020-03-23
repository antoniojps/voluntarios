import React, { useState, useEffect, useRef } from "react";
import { Icon } from "components/atoms";
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import "../Filter/Filter.module.scss";

const Search = ({
  title = 'procurar por',
  desc,
  searchPlaceholder = "| procurar",
  handleChange,
  value = '',
}) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(value);
  const searchRef = useRef(null);
  const isActive = !!searchValue

  useEffect(() => {
    if (open) {
      searchRef.current.focus()
    }
  }, [open]);

  useEffect(() => {
    handleChange(searchValue)
  }, [searchValue]);

  return (
    <div className="filter">
      { !open
        ? (
        <button
          className={`filter__button ${isActive ? "filter__button--active" : ""}`}
          onClick={() => setOpen(!open)}
        >
          <div className="filter__button__label">
            <p title='title'>{title}</p>
            {desc && <p title='desc'>{desc}</p>}
          </div>
          <span className="filter__arrow">
            <Icon icon={faChevronRight} />
          </span>
        </button>
        )
      : (
        <div className="filter__list">
            <div className="filter__list__head" onClick={() => setOpen(false)}>
              <Icon icon={faChevronLeft} />
            <span>{title}</span>
          </div>

          <input
            ref={searchRef}
            value={searchValue}
            className="filter__list__item"
            type="text"
            placeholder={searchPlaceholder}
            onChange={(e) => setSearchValue(e.target.value)}
          />

        </div>
      )}
    </div>
  );
};

export default Search;
