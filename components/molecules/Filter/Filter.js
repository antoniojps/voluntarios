import React, { useState, useEffect, useRef } from "react";
import { Icon } from "components/atoms";
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'

const Filter = ({
  title = "ordenar por",
  descriptionDefault = 'Todos',
  items,
  itemSelected = null,
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
    setItemsToShow([...items.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()))]);
  }, [searchValue]);

  const selectedItem = items.find(item => item._id === selected);

  return (
    <div className="filter">
      {!open
        ? (
          <button
            className={`filter__button ${selectedItem ? "filter__button--active" : ""}`}
            onClick={() => setOpen(!open)}
          >
            <div className="filter__button__label">
              <p title='title'>{title}</p>
              <p title='desc'>{selectedItem ? selectedItem.name : descriptionDefault}</p>
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
                  key={item._id}
                  className={`filter__list__item ${
                    item._id === selected ? "filter__list__item--selected" : ""
                    }`}
                  onClick={() => {
                    const newValue = selected === item._id ? '' : item._id
                    setSelected(newValue)
                    setOpen(false);
                    handleChange(newValue)
                  }}
                >
                  <input type="radio" checked={item._id === selected} id={`radio${item._id}`} />
                  <label htmlFor={`radio${item._id}`}>{item.name}</label>
                </div>
              ))}
            </div>
          </div>
        )}
      <style jsx>{`
      @import "assets/styles/mixins.scss";

      .filter {
        display: flex;
        &__button {
          width: 100%;
          padding: 1rem calc(1rem - 5px) 1rem 1rem;
          border: 0;
          border-radius: var(--borderRadius);
          background-color: var(--bg);
          outline: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          height: fit-content;
          @include box-shadow;
          border-left: 5px solid var(--bg);
          padding-left: calc(1rem - 5px);

          &:hover {
            background: var(--bg);
            border: 0;
            border-left: 5px solid var(--primary);
            color: var(--base);
            .filter__arrow {
              transform: translateX(2px);
            }
          }
          &--active {
            border-left: 5px solid var(--primary);
          }

          svg {
            height: 20px;
            width: 20px;
            margin-left: 20px;
          }

          &__label {
            display: flex;
            flex-direction: column;
            align-items: start;

            [title='title'] {
              font-size: 1rem;
              font-weight: bold;
              text-transform: uppercase;
              color: var(--primary);
              margin: 0;
              margin-bottom: var(--spacing-xs4);
              padding: 0;
            }

            [title='desc'] {
              font-size: 0.8rem;
              font-weight: normal;
              text-transform: none;
              margin: 0;
              padding: 0;
              color: var(--base);
            }
          }
        }

        &__list {
          width: 100%;
          display: flex;
          flex-direction: column;
          border-radius: 5px;
          overflow: hidden;
          background-color: var(--bg);
          @include box-shadow;

          &__head {
            text-transform: uppercase;
            font-size: 1rem;
            font-weight: bold;
            border-bottom: 1px solid var(--border);
          }

          &__scrollable {
            @include custom-scrollbar;
            overflow-y: auto;
            max-height: 130px;
          }

          &__item {
            font-size: 0.8rem;
            font-weight: normal;
          }

          &__item,
          &__head {
            display: flex;
            align-items: center;
            padding: 0.8rem;
            cursor: pointer;

            @include radio-button;

            [type="radio"] {
              margin-right: 8px;
            }

            svg {
              margin-right: 8px;
              height: 15px;
              width: 15px;
            }

            &--selected {
              color: var(--bg);
              background: var(--primary);
            }
          }

          input {
            border: 0;
            padding: 1rem;
            outline: none;
            cursor: text;
            color: var(--primary);

            &:hover {
              background: transparent;
              color: var(--primary);
            }
          }
        }
        &__arrow {
          transition: transform 0.2s ease;
        }
      }
      `}</style>
    </div>
  );
};

export default Filter;
