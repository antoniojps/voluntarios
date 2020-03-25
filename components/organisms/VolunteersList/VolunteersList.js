import React, { memo } from 'react'
import InfiniteScroll from 'react-infinite-scroller';
import { Card } from 'components/molecules'
import './VolunteersList.module.scss'

const VolunteersList = ({
  data = [],
  loading = true,
  error = null,
  handleFetchMore = () => {},
  hasNextPage = false,
}) => {
  const renderContent = () => {
    if (loading && (!data || !data.users || !data.users.list)) return 'A carregar.';
    if (error) return 'Ocorreu um erro.';
    const volunteers = data && data.users && data.users.list ? data.users.list : [];

    if (volunteers.length === 0) {
      return 'no data';
    }

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
        {volunteers.map(volunteer => (
          <Card {...volunteer} key={volunteer._id} />
        ))}
        {hasNextPage && <button onClick={handleFetchMore}>Carregar mais</button>}
      </InfiniteScroll>
    )
  }

  return (
    <div>
      {renderContent()}
    </div>
  )
}

export default memo(VolunteersList)