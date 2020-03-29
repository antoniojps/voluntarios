import React, { useState, useEffect, useMemo, useRef } from 'react';
import Actions from './Actions'
import { Icon } from "components/atoms";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import "./Input.module.scss";
import InputPlaces from './InputPlaces';
import * as yup from 'yup';

const InputLocations = ({
    options = [],
    number,
    title,
    handleChange = () => null,
    handleSubmit = () => null,
    disabled = false,
    placeholder = 'Filtrar opcoes',
    initialValue = [],
    autoFocus = false,
    note = null,
    schema = yup.string(),
    ...selectProps
}) => {
    const inputEl = useRef(null)
    const [selectedValues, setSelectedValues] = useState(initialValue);
    const [isSelectOpen, setSelectOpen] = useState(false)
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
        async function validate() {
            try {
                await schema.validate(selectedValues)
                setInputState({valid: true, error: false, errorMessage: ''})
            } catch (err) {
                if (err.name === 'ValidationError') {
                    setInputState({valid: false, error: true, errorMessage: err.errors[0]})
                }
            }
        }
        validate()
    }, [selectedValues])

    useEffect(() => {
        if (autoFocus && inputEl && inputEl.current) {
            inputEl.current.focus()
        }
    }, [inputEl, autoFocus])

    const onSubmit = () => {
        setHasSubmitted(true)
        if (valid) handleSubmit(selectedValues)
    }
    const showSkip = !requiredComputed && selectedValues.length === 0
    const showSubmit = !showSkip && (valid || (selectedValues.length === 0 && !hasSubmitted))
    const showError = hasSubmitted && error

    const onChange = (newValues) => {
        handleChange(newValues)
        setSelectedValues(newValues)
    }

    const defaultValue = useMemo(() => {
        return initialValue.map(value => options.find(opt => opt.value === value))
    }, [initialValue])

    // enter press
    const handleKeyPress = (e) => {
        if(e.key === 'Enter' && !isSelectOpen) onSubmit()
    }

    return (
        <div className='input'>
            <div className='input__head'>
                {number && (
                    <>
                        <span>{number}</span>
                        <span className="input__head--icon">
                            <Icon icon={faArrowRight} />
                        </span>                    </>
                )}
                <span title='title'>{title}</span>
            </div>
            {note && (
                <div className='input__note'>
                    {note}
                </div>
            )}

            <div className='input__multiple'>
                <InputPlaces
                    placeholder={placeholder}
                    onChange={onChange}
                    isDisabled={disabled}
                    defaultValue={defaultValue}
                    isClearable={false}
                    autoFocus={autoFocus}
                    onMenuOpen={() => setSelectOpen(true)}
                    onMenuClose={() => setSelectOpen(false)}
                    onKeyDown={handleKeyPress}
                    ref={inputEl}
                    {...selectProps}
                />
            </div>

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

export default InputLocations;