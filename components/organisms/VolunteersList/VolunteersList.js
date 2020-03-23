import React from 'react'
import { Card, Search } from 'components/molecules'
import './VolunteersList.module.scss'

const VolunteersList = ({ volunteers }) => {
  return (
    <div className="volunteers">
      <div className="volunteers__sidebar">
        <Search title='procurar por' desc='todos os voluntários' handleChange={console.log} />
      </div>
      <div className="volunteers__cards">
        {volunteers.map(volunteer => (
          <Card {...volunteer} key={volunteer._id} />
        ))}
      </div>
    </div>
  )
}

export default VolunteersList