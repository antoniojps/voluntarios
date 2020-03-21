import React, { useState, useEffect, useRef } from "react";
import { ArrowSvg } from "components/atoms";
import "./Filter.module.scss";

const Filter = ({
  title = "ordenar por",
  items,
  itemSelected = 0,
  searchEnabled = false,
  searchPlaceholder = "| procurar",
  handleChange,
}) => {
  const [itemsToShow, setItemsToShow] = useState([...items]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(itemSelected);
  const [searchValue, setSearchValue] = useState('');
  const searchRef = useRef(null);

  useEffect(() => {
    if (open) {
      setItemsToShow([...items]);
      if (searchEnabled) {
        searchRef.current.focus()
      }
    }
  }, [open]);

  useEffect(() => {
    setItemsToShow([...items.filter(item => item.label.toLowerCase().includes(searchValue.toLowerCase()))]);
  }, [searchValue]);

  return (
    <div className="filter">
      <button
        className={`filter__button ${open ? "filter__button--active" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <div className="filter__button__label">
          <p title='title'>{title}</p>
          <p title='desc'>{items[selected].label}</p>
        </div>

        <ArrowSvg />
      </button>
      {open && (
        <div className="filter__list">
          <div className="filter__list__head" onClick={() => setOpen(false)}>
            <ArrowSvg />
            <span>{title}</span>
          </div>

          {searchEnabled && (
            <input
              value={searchValue}
              ref={searchRef}
              className="filter__list__item"
              type="text"
              placeholder={searchPlaceholder}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          )}

          <div className="filter__list__scrollable">
            {itemsToShow.map(item => (
              <div
                key={item.id}
                className={`filter__list__item ${
                  item.id === selected ? "filter__list__item--selected" : ""
                  }`}
                onClick={() => {
                  setSelected(item.id);
                  setOpen(false);
                  handleChange(item)
                }}
              >
                <input type="radio" checked={item.id === selected} id={`radio${item.id}`} />
                <label htmlFor={`radio${item.id}`}>{item.label}</label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
