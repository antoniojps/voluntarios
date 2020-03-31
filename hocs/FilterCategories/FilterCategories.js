import { useState, useEffect, forwardRef } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { CATEGORIES_QUERY } from '../../graphql'
import { Filter } from 'components/molecules'

const FilterCategories = forwardRef((props, ref) => {
    const [items, setItems] = useState([]);
    const [loadCategories, { data }] = useLazyQuery(CATEGORIES_QUERY, {
        fetchPolicy: 'cache-and-network',
    })

    useEffect(() => {
        if (data && data.allCategories) {
            setItems(data.allCategories);
        }
    }, [data])

    return <Filter {...props} items={items} lazyFetchItems={loadCategories} ref={ref} />
})

export default FilterCategories;