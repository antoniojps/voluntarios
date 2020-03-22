import React, { useState, useEffect, useRef } from 'react';
import { ArrowSvg } from "components/atoms";
import { AnimatePresence, motion } from 'framer-motion'
import "./Input.module.scss";

const InputText = ({
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
        setInputValue(value)
    }, [value])

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
                type='text'
                placeholder={placeholder}
                disabled={disabled}
                onChange={e => { setInputValue(e.target.value); }}
                value={inputValue}
                ref={inputEl}
            />
            <AnimatePresence initial={false}>
            {error && (
                <motion.p
                    className='input__input-text__error-message'
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    key="error"
                >
                    {errorMessage}
                </motion.p>
            )}

            {!required && !value && (
                <motion.button
                    className='btn--primary'
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    key="skip"
                >
                    Passar
                </motion.button>
            )}

            {valid && (
                <motion.button
                    className='btn--primary'
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    key="ok"
                >
                    Ok
                </motion.button>
            )}
            </AnimatePresence>

        </div>
    )
}

export default InputText;