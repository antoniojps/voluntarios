import React, { useState, useEffect, useMemo } from 'react';
import Actions from './Actions'
import { Icon } from "components/atoms";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import "./Input.module.scss";
import Select from '../Select/Select';

const InputMultiple = ({
    options = [],
    number,
    title,
    handleChange = () => null,
    handleSubmit = () => null,
    disabled = false,
    placeholder = 'Filtrar opcoes',
    initialValue = [],
    autoFocus = false,
    required = false,
    note = null,
    ...selectProps
}) => {
    const [selectedValues, setSelectedValues] = useState(initialValue);
    const [isSelectOpen, setSelectOpen] = useState(false)
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [{ valid, error, errorMessage }, setInputState] = useState({
        valid: false,
        error: false,
        errorMessage: 'Campo inválido',
    })

    useEffect(() => {
        if (required && selectedValues.length === 0) {
            setInputState({valid: false,error: true, errorMessage: 'Por favor seleccione pelos menos uma opção.'})
        } else {
            setInputState({valid: true, error: false, errorMessage: ''})
        }
    }, [selectedValues])

    const onSubmit = () => {
        setHasSubmitted(true)
        if (valid) handleSubmit(selectedValues)
    }
    const showSkip = !required && selectedValues.length === 0
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
                <Select
                    placeholder={placeholder}
                    options={options}
                    onChange={onChange}
                    isDisabled={disabled}
                    value={selectedValues}
                    defaultValue={defaultValue}
                    isMulti
                    isClearable={false}
                    autoFocus={autoFocus}
                    onMenuOpen={() => setSelectOpen(true)}
                    onMenuClose={() => setSelectOpen(false)}
                    onKeyDown={handleKeyPress}
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

export default InputMultiple;