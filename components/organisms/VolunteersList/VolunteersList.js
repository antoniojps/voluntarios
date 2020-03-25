import React, { memo } from 'react'
import InfiniteScroll from 'react-infinite-scroller';
import { Card } from 'components/molecules'
import './VolunteersList.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import { Note } from '@zeit-ui/react'

const VolunteersList = ({
  data = [],
  loading = true,
  error = null,
  handleFetchMore = () => {},
  hasNextPage = false,
}) => {
  if (error) return <Note label={false} type="error" style={{height: 'fit-content'}}>Ocorreu um erro.</Note>
  const volunteers = data && data.users && data.users.list ? data.users.list : [{_id: 1},{_id: 2}, {_id: 3}, { _id: 4}];

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
    <AnimatePresence initial={true} exitBeforeEnter>
      {
        volunteers.map(volunteer => (
          <motion.div
            key={volunteer._id}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Card
              {...volunteer}
              loading={(loading || (!data || !data.users || !data.users.list))}
            />
          </motion.div>
          ))
        }
        </AnimatePresence>
      {hasNextPage && <button onClick={handleFetchMore}>Carregar mais</button>}
    </InfiniteScroll>
  )
}

export default memo(VolunteersList)