import React, { useState } from 'react';
import { fetchPlace } from '../../../services/places';
import AsyncSelect from 'react-select/async';
import "./Input.module.scss";

const InputPlaces = ({ initialValue = '', onChange }) => {
    const [inputValue, setInputValue] = useState(initialValue)
    const filterData = (places) => places.results && places.results.length > 0 ? places.results.map(place => ({
        value: place.id,
        label: place.name,
    })) : [];

    const promiseOptions = async inputValue => {
        const places = await fetchPlace(inputValue);
        return filterData(places);
    };

    const optionStyles = (base, state) => ({
        ...base,
        cursor: 'pointer',
        backgroundColor: state.isFocused ? '#fafafa' : '#ffffff',
    });

    return (
        <div className='input-places'>
            <AsyncSelect
                onInputChange={setInputValue}
                onChange={onChange}
                inputValue={inputValue}
                cacheOptions
                defaultOptions
                placeholder='Pesquisar localização'
                loadOptions={promiseOptions}
                styles={{ option: optionStyles }}
            />
        </div>
    )
}

export default InputPlaces;