import React, { useState, useEffect, useRef } from "react";
import { Icon } from "components/atoms";
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import useKeyPress from 'utils/hooks/useKeyPress';

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
  const isActive = !!searchValue;

  if (useKeyPress('Enter')) {
    if (searchValue.length > 0) {
      handleChange(searchValue)
    }
  }

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
      {!open
        ? (
          <button
            className={`filter__button ${isActive ? "filter__button--active" : ""}`}
            onClick={() => setOpen(!open)}
          >
            <div className="filter__button__label">
              <p title='title'>{title}</p>
              {!isActive && desc && <p title='desc'>{desc}</p>}
              {isActive && <p title='desc'>{searchValue}</p>}
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

export default Search;
