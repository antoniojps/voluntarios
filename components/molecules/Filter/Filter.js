import React, { useState } from "react";
import { ArrowSvg } from "components/atoms";
import "./Filter.module.scss";

const list = [
  {
    id: 0,
    label: "inscritos recentemente",
  },
  {
    id: 1,
    label: "inscritos ha mais tempo",
  },
  {
    id: 2,
    label: "inscritos ha mais tempo",
  },
  {
    id: 3,
    label: "inscritos ha mais tempo",
  },
  {
    id: 4,
    label: "inscritos ha mais tempo",
  },
  {
    id: 5,
    label: "inscritos ha mais tempo",
  },
];


const Filter = ({
  title = "ordenar por",
  items = list,
  searchEnabled = true,
  searchPlaceholder = '| procurar',
}) => {
  // eslint-disable-next-line no-unused-vars
  const [itemsToShow, setItemsToShow] = useState([...items]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);

  return (
    <div className="filter">
      <button
        className={`filter__button ${open ? "filter__button--active" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <div className="filter__button__label">
          <p>{title}</p>
          <p>{items[selected].label}</p>
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
              className="filter__list__item"
              type="text"
              placeholder={searchPlaceholder}
            />
          )}

          {itemsToShow.map(item => (
            <div
              key={item.id}
              className={`filter__list__item ${
                item.id === selected ? "filter__list__item--selected" : ""
              }`}
              onClick={() => {
                setSelected(item.id);
                setOpen(false);
              }}
            >
              <ArrowSvg />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filter