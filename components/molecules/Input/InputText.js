import React, { useState, useEffect, useRef, useMemo } from 'react';
import Actions from './Actions'
import { Icon } from "components/atoms";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import * as yup from 'yup';
import "./Input.module.scss";


const InputText = ({
    number,
    title,
    handleChange = () => null,
    handleSubmit = () => null,
    disabled = false,
    placeholder = 'Palavra chave',
    value = '',
    autoFocus = false,
    schema = yup.string(),
}) => {
    const inputEl = useRef(null)
    const [inputValue, setInputValue] = useState(value);
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [{ valid, error, errorMessage }, setInputState] = useState({
        valid: false,
        error: false,
        errorMessage: 'Campo inválido',
    })
    const requiredComputed = useMemo(() => {
        const isRequiredFromSchema = schema.describe().tests.find(test => test.name === 'required')
        return !!isRequiredFromSchema
    }, [schema])

    useEffect(() => {
        console.log({ valid, error, errorMessage })
    }, [{ valid, error, errorMessage }])

    useEffect(() => {
        async function validate() {
            try {
                await schema.validate(inputValue)
                setInputState({valid: true, error: false, errorMessage: ''})
            } catch (err) {
                if (err.name === 'ValidationError') {
                    setInputState({valid: false, error: true, errorMessage: err.errors[0]})
                }
            }
        }
        validate()
    }, [inputValue])

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

    // enter press
    const handleKeyPress = (e) => {
        if(e.key === 'Enter') onSubmit()
    }
    const onSubmit = () => {
        setHasSubmitted(true)
        if (valid) handleSubmit(inputValue)
    }

    const showSkip = !requiredComputed && inputValue === ''
    const showSubmit = !showSkip && (valid || (inputValue !== '' && !hasSubmitted))
    const showError = hasSubmitted && error

    return (
        <div className='input'>
            <div className='input__head'>
                {number && (
                    <>
                        <span>{number}</span>
                        <span className="input__head--icon">
                            <Icon icon={faArrowRight} />
                        </span>
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
                onKeyPress={handleKeyPress}
            />
            <Actions
                showError={showError}
                showSkip={showSkip}
                showSubmit={showSubmit}
                errorMessage={errorMessage}
                onSubmit={onSubmit}
            />

        </div>
    )
}

export default InputText;