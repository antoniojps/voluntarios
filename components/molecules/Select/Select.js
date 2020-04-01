/* Custom Input Component to be used with Formik */
import React, { useMemo } from 'react';
import Select, { components } from 'react-select';
import './Select.module.scss'

export const MultiValueContainer = props => {
  return (
    <div className="multi-value">
      <components.MultiValueContainer {...props} />
      <style jsx>{`
        .multi-value {
            margin: var(--spacing-xs5) var(--spacing-xs4) var(--spacing-xs5) 0;
            border-radius: var(--borderRadius);
            background-color: ${props.data.color || '#000'} !important;
        }
      `}</style>
    </div>
  );
};


const FieldSelect = ({
  options,
  creatable,
  isMulti,
  name,
  onBlur,
  onChange,
  value,
  placeholder = 'Selecione',
  ...props
}) => {
  const handleChange = option => {
    if (isMulti) {
      const values = option ? option.map(({ value }) => value) : [];
      onChange(values)
      return;
    }
    if (option && option.value) onChange(option.value);
    onChange(null)
  };

  const noOptionsMessage = useMemo(() => {
    if (creatable) return 'Digite para criar uma opção';
    return 'Sem opções';
  }, [creatable]);


  const isomorphicWindow = typeof window !== 'undefined' ? window : {}
  return (
      <Select
        classNamePrefix="react-select"
        noOptionsMessage={() => noOptionsMessage}
        options={options}
        name={name}
        value={options ? options.find(option => option.value === value) : ''}
        onChange={handleChange}
        onBlur={onBlur}
        isMulti={isMulti}
        placeholder={placeholder}
        components={{ MultiValueContainer }}
        loadingMessage={({inputValue}) => `A procurar "${inputValue}"...`}
        styles={{
          multiValue: base => ({
            ...base,
            backgroundColor: 'transparent',
            color: 'white',
          }),
          multiValueLabel: base => ({
            ...base,
            backgroundColor: 'transparent',
            color: 'white',
          }),
          menuPortal: base => ({ ...base, zIndex: 9999 }),
        }}
        menuPortalTarget={isomorphicWindow && isomorphicWindow.document && isomorphicWindow.document.body ? isomorphicWindow.document.body : {}}
        {...props}
    />
  );
};

export default FieldSelect;
