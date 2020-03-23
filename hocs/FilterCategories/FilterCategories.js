import { useQuery } from '@apollo/react-hooks';
import { CATEGORIES_QUERY } from '../../graphql'
import { Filter } from 'components/molecules'

const FilterCategories = props => {
    const { data, loading, error } = useQuery(CATEGORIES_QUERY);

    if (loading || error || !data || !data.allCategories) return null;

    return <Filter {...props} items={data.allCategories} />
}

export default FilterCategories;