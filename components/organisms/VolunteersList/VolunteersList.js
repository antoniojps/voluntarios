import React, { memo } from 'react'
import { useQuery } from '@apollo/react-hooks';
import { USERS_QUERY } from '../../../graphql'
import { Card } from 'components/molecules'
import './VolunteersList.module.scss'

const VolunteersList = ({ filters }) => {
  const { data, loading, error } = useQuery(
    USERS_QUERY,
    {
      variables: filters,
    },
  );

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
    </div>
  )
}

export default memo(VolunteersList)