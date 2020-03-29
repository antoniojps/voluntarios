import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { CATEGORIES_QUERY } from '../../../graphql'
import { Note } from '@zeit-ui/react'
import { Select } from 'components/molecules'

function ProfileSelect({ categories, handleChange }) {
    const [categoriesData, setCategoriesData] = useState(categories);

    useEffect(() => {
        handleChange(categoriesData)
    }, [categoriesData])

    const { data, loading, error } = useQuery(CATEGORIES_QUERY);
    if (error) return <Note label={false} type="error" style={{ height: 'fit-content' }}>Ocorreu um erro.</Note>
    
    const options = data && data.allCategories.length > 0 ? data.allCategories.map((category) => ({
        value: category._id,
        label: category.name,
        color: category.color,
    })) : []

    const defaultValue = categoriesData.map((category) => ({
        value: category._id,
        label: category.name,
        color: category.color,
    }))

    return (
        <Select
            placeholder="Selecione áreas de interesse."
            options={options}
            onChange={setCategoriesData}
            isLoading={loading}
            isDisabled={loading}
            value={categoriesData}
            defaultValue={defaultValue}
            isMulti
        />
    )
}

export default ProfileSelect;