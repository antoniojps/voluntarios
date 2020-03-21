import React, { useState, useEffect } from 'react';
import { ArrowSvg } from "components/atoms";
import "./Input.module.scss";

const InputMultiple = ({
    items = [],
    number,
    title,
    handleChange,
    disabled = false,
    required = true,
    placeholder = 'Filtrar opcoes',
    value = '',
}) => {
    const [inputValue, setInputValue] = useState(value);
    const [valid, setValid] = useState(false);
    const [itemsToDisplay, setItemsToDisplay] = useState([...items]);
    const [itemsSelected, setItemsSelected] = useState([]);

    useEffect(() => {
        if (inputValue.length > 0) {
            return setItemsToDisplay([...items.filter(item => item.label.toLowerCase().includes(inputValue.toLowerCase()))])
        }
        return setItemsToDisplay([...items])
    }, [inputValue])

    useEffect(() => {
        if (itemsSelected.length > 0) {
            return setValid(true);
        }
        return setValid(false);
    }, [itemsSelected])

    function handleSelect(item) {
        const index = itemsSelected.findIndex(i => i === item);
        if (index !== -1) {
            setItemsSelected(itemsSelected.slice(0, index).concat(itemsSelected.slice(index + 1, itemsSelected.length)));
        } else {
            setItemsSelected([...itemsSelected, item])
        }
        setInputValue('')
    }

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

            <div className='input__multiple'>
                {itemsSelected.map(item => (
                    <p>{item.label}</p>
                ))}
                <input
                    className='input__input-text'
                    type='text'
                    placeholder={placeholder}
                    disabled={disabled}
                    onChange={e => setInputValue(e.target.value)}
                    value={inputValue}
                />
            </div>

            {itemsToDisplay.length > 0 && (
                <ul className='input__dropdown-list'>
                    {itemsToDisplay.map(item => (
                        <li
                            key={item.id}
                            className={itemsSelected.find(i => i === item) ? 'selected' : ''}
                            onClick={() => handleSelect(item)}
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
                <button className='btn--primary' onClick={() => handleChange(itemsSelected)}>Ok</button>
            )}
        </div>
    )
}

export default InputMultiple;