import React, { useState, useEffect } from 'react';
import { ArrowSvg } from "components/atoms";
import "./Input.module.scss";

const InputDropdown = ({
    items = [],
    number,
    title,
    handleChange,
    limit = 100,
    disabled = false,
    required = false,
    placeholder = 'Insira algo',
    value = '',
}) => {
    const [inputValue, setInputValue] = useState(value);
    const [valid, setValid] = useState(false);
    const [itemsToDisplay, setItemsToDisplay] = useState([...items.slice(0, limit)]);
    const [itemSelected, setItemSelected] = useState(null);

    useEffect(() => {
        if (inputValue.length > 0) {
            const selectedIndex = items.findIndex(item => item.label.toLowerCase() === inputValue.toLowerCase())
            console.log(selectedIndex);
            if (selectedIndex !== -1) {
                setValid(true);
                setItemSelected(items[selectedIndex]);
                return setItemsToDisplay([])
            }
            setValid(false);
            return setItemsToDisplay([...items.filter(item => item.label.toLowerCase().includes(inputValue.toLowerCase()))].slice(0, limit))
        }
        setValid(false);
        return setItemsToDisplay([...items.slice(0, limit)])
    }, [inputValue])

    return (
        <div className='input'>
            <div className='input__head'>
                {number && (
                    <>
                        <span>{number}</span>
                        <ArrowSvg />
                    </>
                )}
                <span title='title'>{title}</span>
            </div>

            <input
                className='input__input-text'
                type='text'
                placeholder={placeholder}
                disabled={disabled}
                onChange={e => setInputValue(e.target.value)}
                value={inputValue}
            />

            {itemsToDisplay.length > 0 && (
                <ul className='input__dropdown-list'>
                    {itemsToDisplay.map(item => (
                        <li
                            key={item.id}
                            onClick={() => {
                                setInputValue(item.label)
                            }}
                        >
                            {item.label}
                        </li>
                    ))}
                </ul>
            )}

            {!required && !valid && (
                <button className='btn--primary'>Passar</button>
            )}

            {valid && (
                <button className='btn--primary' onClick={() => handleChange(itemSelected)}>Ok</button>
            )}
        </div>
    )
}

export default InputDropdown;