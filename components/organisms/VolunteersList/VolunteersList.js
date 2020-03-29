import React, { memo } from 'react'
import InfiniteScroll from 'react-infinite-scroller';
import Volunteer from '../../../containers/Volunteer'
import './VolunteersList.module.scss'
import { Note } from '@zeit-ui/react'

// for loading purposes
const defaultData = [
  {_id: 1},{_id: 2}, {_id: 3}, { _id: 4},
  {_id: 5},{_id: 6}, {_id: 7}, { _id: 8},
]

const VolunteersList = ({
  data = [],
  loading = true,
  error = null,
  handleFetchMore = () => {},
  hasNextPage = false,
}) => {
  if (error) return <Note label={false} type="error" style={{height: 'fit-content'}}>Ocorreu um erro.</Note>
  const volunteers = data && data.users && data.users.list ? data.users.list : defaultData;

  return (
    <InfiniteScroll
      pageStart={1}
      loadMore={loading ? () => null : handleFetchMore}
      hasMore={hasNextPage}
      initialLoad={false}
      key="infinite-scroll"
      className="volunteers__cards"
      threshold={0}
    >
      {
        volunteers.map(volunteer => (
          <Volunteer
            key={volunteer._id}
            {...volunteer}
            loading={(loading && (!data || !data.users || !data.users.list))}
          />
        ))
      }
      {volunteers.length === 0 && <p>Não encontramos nenhum voluntário.</p>}
      {hasNextPage && <button onClick={handleFetchMore}>Carregar mais</button>}
    </InfiniteScroll>
  )
}

export default memo(VolunteersList)