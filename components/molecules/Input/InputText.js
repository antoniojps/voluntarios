import React, { useState, useEffect } from 'react';
import { ArrowSvg } from "components/atoms";
import "./Input.module.scss";

const InputText = ({
    number,
    title,
    placeholder = 'Insira algo',
    disabled = false,
    handleChange,
    value = '',
    valid = false,
    error = false,
    errorMessage = 'O valor inserido é inválido.',
}) => {
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
        handleChange(inputValue)
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
                className={`input__input-text ${error ? 'input__input-text--error' : ''}`}
                type='text'
                placeholder={placeholder}
                disabled={disabled}
                onChange={e => { setInputValue(e.target.value); }}
                value={inputValue}
            />

            {error && (
                <p className='input__input-text__error-message'>{errorMessage}</p>
            )}

            {valid && (
                <button>Passar</button>
            )}
        </div>
    )
}

export default InputText;