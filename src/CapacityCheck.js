import { fetchSearchData } from './api'
import { createRange, isOverlappingRanges } from './dateRangeHelpers'

const getAllReservedRoomIds = (queryRange, allReservations) => {
  let reservedRoomIds = []
  allReservations.map(({ arrivalDate, departureDate, rooms }) => {
    const currentRange = createRange(arrivalDate, departureDate)
    if (isOverlappingRanges(queryRange, currentRange)) {
      return reservedRoomIds.push(...rooms)
    }
  })
  return reservedRoomIds
}

const filterResultsWithRoomIds = (allRooms, reservedRoomIds) => {
  return allRooms.filter(item =>
    reservedRoomIds
      .map(filter => (filter.id === item.id))
      .map(val => val ? false : true)
      .reduce((acc, cum) => acc && cum, reservedRoomIds.length)
  )
}
 
export default async ({ data }) => {
  const queryRange = createRange(data.a, data.b)
  const { allRooms, allReservations } = await fetchSearchData()
  const reservedRoomIds = getAllReservedRoomIds(queryRange, allReservations)
  const filteredResults = filterResultsWithRoomIds(allRooms, reservedRoomIds)
  return {
    data: {
      availableRooms: reservedRoomIds.length > 0 ? filteredResults : allRooms
    }
  }
}