import React, { memo } from 'react'
import { Card } from 'components/molecules'
import './VolunteersList.module.scss'

const VolunteersList = ({ data, loading, error, handleFetchMore }) => {
  const hasNextPage = data && data.users && data.users.pageInfo && data.users.pageInfo.hasNextPage;

  const renderContent = () => {
    if (loading) return 'A carregar.';
    if (error) return 'Ocorreu um erro.';
    const volunteers = data && data.users && data.users.list ? data.users.list : [];

    if (volunteers.length === 0) {
      return 'no data';
    }

    return volunteers.map(volunteer => (
      <Card {...volunteer} key={volunteer._id} />
    ))
  }

  return (
    <div className="volunteers__cards">
      {renderContent()}
      {hasNextPage &&
        <button onClick={handleFetchMore}>Carregar mais</button>
      }
    </div>
  )
}

export default memo(VolunteersList)