import React, { useState } from 'react';
import { fetchPlace } from '../../../services/places';
import Select from '../Select/Select';
import "./Input.module.scss";
import debounce from 'lodash.debounce'

const Option = (props) => {
    const {
      children,
      className,
      cx,
      getStyles,
      isDisabled,
      isFocused,
      isSelected,
      innerRef,
      innerProps,
      data,
    } = props;
    return (
      <div
        styles={getStyles('option', props)}
        className={cx(
          {
            option: true,
            'option--is-disabled': isDisabled,
            'option--is-focused': isFocused,
            'option--is-selected': isSelected,
          },
          className,
        )}
        ref={innerRef}
        {...innerProps}
      >
        <div className="option--place">
            {children}
            {data.secondary && (
                <div className="secondary">
                    {data.secondary}
                </div>
            )}
            </div>
            <style jsx>{`
                .option--place {
                    display: flex;
                    align-items: center;
                }
                .secondary {
                    font-size: var(--sizes-xs);
                    color: var(--base40);
                    &:before {
                        content: '-';
                        padding: 0 var(--spacing-xs4);
                    }
                }
            `}</style>
      </div>
    );
};

const getAsyncOptions = async (inputValue) => {
    const places = await fetchPlace(inputValue);
    const options = places.results && places.results.length > 0 ? places.results.map(place => ({
        value: place.id,
        label: place.name,
        ...place,
    })) : [];
    return options
}

const loadOptions = (inputValue, callback) => {
    getAsyncOptions(inputValue)
    .then(results => callback(results))
  // Explicitly not returning a Promise.
  return;
}
const debouncedLoadOptions = debounce(loadOptions, 1000);

const InputPlaces = props => {
    const { initialValue = '', onChange } = props;
    const [inputValue, setInputValue] = useState(initialValue.name)

    const dropdownIndicatorStyles = (base) => ({
        ...base,
        display: 'none',
    })

    const handleChange = (value) => {
        console.log(value)
        onChange(value)
    }

    return (
        <div className='input-places'>
            <Select
                {...props}
                onInputChange={setInputValue}
                onChange={handleChange}
                inputValue={inputValue}
                placeholder='Pesquisar localização'
                loadOptions={debouncedLoadOptions}
                noOptionsMessage={() => 'Nenhuma localização'}
                styles={{
                    dropdownIndicator: dropdownIndicatorStyles,
                    indicatorSeparator: dropdownIndicatorStyles,
                }}
                components={{
                    Option,
                }}
                isAsync
            />
        </div>
    )
}

export default InputPlaces;