import React, { useState, useEffect, useRef } from 'react';
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
    autoFocus = false,
}) => {
    const [inputValue, setInputValue] = useState(value);
    const inputEl = useRef(null)

    useEffect(() => {
        if (autoFocus && inputEl && inputEl.current) {
            inputEl.current.focus()
        }
    }, [inputEl, autoFocus])

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
                ref={inputEl}
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