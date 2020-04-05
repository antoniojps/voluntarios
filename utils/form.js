import cleanDeep from 'clean-deep'
import uniqBy from 'lodash.uniqby'

export function getErrorMessage(error) {
  if (error.graphQLErrors) {
    for (const graphQLError of error.graphQLErrors) {
      if (
        graphQLError.extensions &&
        graphQLError.extensions.code === 'BAD_USER_INPUT'
      ) {
        return graphQLError.message
      }
    }
  }
  return error.message
}

export const mergeLocations = (newLocations = [], userLocations = [], selectedLocations = []) => {
  if (selectedLocations.length === 0) return []

  // find which of the selected are old locations
  const oldLocationsValues = selectedLocations.filter(opt => userLocations.filter(userLocation => userLocation._id === opt.value))
  const oldLocations = userLocations.filter(savedLocation => oldLocationsValues.filter(opt => opt.value === savedLocation._id))
  // remove typenames
  const oldLocationsClean = oldLocations.length > 0 ? oldLocations.map(location => ({
      name: location.name,
      geolocation: {
          lat: location.geolocation.lat,
          long: location.geolocation.long,
      },
  })) : []

  // merge
  const locationsMerged = [
      ...oldLocationsClean,
      ...newLocations,
  ]
  // remove dups by name property
  const newUserLocations = cleanDeep(uniqBy(locationsMerged, "name"))
  return newUserLocations
}

export const computeNewLocationsIDs = (userLocations = [], selectedLocations = []) => {
  if (selectedLocations.length > 0) {
      return cleanDeep(selectedLocations.reduce(
          (acc, location) => {
              const isUserLocation = userLocations.find(userLocation => userLocation._id === location.value)
              if (isUserLocation) return acc
              return [
                  ...acc,
                  location.value,
              ]
          },
          [],
      ))
  }
}

export const parseCategories = (categories) => {
  if (!categories || categories.length === 0) return []
  if (categories[0].name) {
      return categories.map(cat => cat._id)
  }
  return categories
}