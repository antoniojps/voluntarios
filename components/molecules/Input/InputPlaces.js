import React from 'react';
import { fetchPlace } from '../../../services/places';
import { MultiValueContainer } from '../Select/Select';
import "./Input.module.scss";
import debounce from 'lodash.debounce'
import AsyncSelect from 'react-select/async';

// custom option for place description
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
            <div>
                {children}
            </div>
            {data.secondary && (
                <div className="secondary">
                    {data.secondary}
                </div>
            )}
            </div>
            <style jsx>{`
                @import "assets/styles/mixins.scss";

                .option--place {
                    display: flex;
                    align-items: baseline;
                    justify-content: center;
                    @include screen(md) {
                        flex-direction: column;
                    }
                }
                .secondary {
                    padding-left: var(--spacing-xs4);
                    font-size: var(--size-xs2);
                    color: var(--base40);
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

// had some difficulty making debounce work with async select
// here's the solution: https://github.com/JedWatson/react-select/issues/3075#issuecomment-506647171
const loadOptions = (inputValue, callback) => {
    getAsyncOptions(inputValue)
    .then(results => callback(results))
  // Explicitly not returning a Promise.
  return;
}
const debouncedLoadOptions = debounce(loadOptions, 1000);

const InputPlaces = ({
    initialValue = [],
    onChange,
}) => {
    const handleChange = (value) => {
        onChange(value)
    }

    // initial value from user locations
    const defaultValue = React.useMemo(() => {
        return initialValue.map(location => ({
            value: location._id,
            label: location.name,
        }))
    }, [initialValue])

        // initial value from user locations
    const defaultOptions = React.useMemo(() => {
        return initialValue.map(location => ({
            value: location._id,
            label: location.name,
        }))
    }, [initialValue])

    return (
        <div className='input-places'>
            <AsyncSelect
                classNamePrefix="react-select"
                defaultOptions={defaultOptions}
                loadOptions={debouncedLoadOptions}
                noOptionsMessage={() => 'Pesquise por exemplo "Lisboa"'}
                defaultValue={defaultValue}
                placeholder='Pesquisar localização'
                components={{
                    Option,
                    MultiValueContainer,
                }}
                onChange={handleChange}
                isMulti
                cacheOptions
            />
        </div>
    )
}

export default InputPlaces;