import React, { useState, useEffect } from 'react';
import { ArrowSvg } from "components/atoms";
import "./Input.module.scss";

const InputPassword = ({
    number,
    title,
    handleChange,
    disabled = false,
    required = false,
    valid = false,
    error = false,
    errorMessage = 'O valor inserido é inválido.',
    placeholder = 'Palavra chave',
    value = '',
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
                type='password'
                placeholder={placeholder}
                disabled={disabled}
                onChange={e => { setInputValue(e.target.value); }}
                value={inputValue}
            />

            {!required && !error && !valid && (
                <button className='btn--primary'>Passar</button>
            )}

            {!required && !error && valid && (
                <button className='btn--primary'>Ok</button>
            )}

            {!required && !valid && error && (
                <p className='input__input-text__error-message'>{errorMessage}</p>
            )}
        </div>
    )
}

export default InputPassword;