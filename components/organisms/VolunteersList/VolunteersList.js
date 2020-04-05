import React, { memo } from 'react'
import InfiniteScroll from 'react-infinite-scroller';
import Volunteer from '../../../containers/Volunteer'
import './VolunteersList.module.scss'
import { ButtonZeit } from 'components/atoms'
import { Note, Button, Spacer, Text } from '@zeit-ui/react'

// for loading purposes
const defaultData = [
  { _id: 1 }, { _id: 2 }, { _id: 3 }, { _id: 4 },
  { _id: 5 }, { _id: 6 }, { _id: 7 }, { _id: 8 },
]

const VolunteersList = ({
  data = [],
  loading = true,
  error = null,
  handleFetchMore = () => { },
  hasNextPage = false,
  hasFilters,
  removeFilters,
  iframe = false,
}) => {
  if (error) return <Note label={false} type="error" style={{ height: 'fit-content' }}>Ocorreu um erro.</Note>
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
            iframe={iframe}
            isClickable
          />
        ))
      }
      {volunteers.length === 0 && (
        <div>
          <div>Não encontramos nenhum voluntário.</div>
          {hasFilters && (
            <>
              <Spacer y={1.5} />
              <Button size="small" type="secondary" onClick={removeFilters}>Remover filtros</Button>
              <Spacer y={.5} />
              <Text small>
                Reparamos que possui filtros selecionados. Se os remover poderá obter mais resultados.
              </Text>
            </>
          )}
        </div>
      )}
      {hasNextPage && <ButtonZeit onClick={handleFetchMore} disabled={loading}>Carregar mais</ButtonZeit>}
      {!hasNextPage && volunteers.length !== 0 && (<p>Final dos resultados</p>)}
    </InfiniteScroll>
  )
}

export default memo(VolunteersList)