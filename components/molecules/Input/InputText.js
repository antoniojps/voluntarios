import React, { useState } from 'react';
import { ArrowSvg } from "components/atoms";
import "./Input.module.scss";

const InputText = ({
    number,
    title,
    placeholder = 'insira algo',
    disabled = false,
    handleChange,
    initialValue = '',
}) => {

    const [value, setValue] = useState(initialValue);
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
                type='text'
                placeholder={placeholder}
                disabled={disabled}
                onChange={e => setValue(e.target.value)}
                value={value}
            />
        </div>
    )
}

export default InputText;