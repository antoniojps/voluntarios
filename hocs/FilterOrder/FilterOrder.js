
import { Filter } from 'components/molecules'

const FilterOrder = props => {
    const items = [
        {
            _id: 'desc',
            name: 'inscritos recentemente',
        },
        {
            _id: 'asc',
            name: 'inscritos há mais tempo',
        },
    ]
    return <Filter {...props} items={items} itemSelected={items[0]._id} />
}

export default FilterOrder;