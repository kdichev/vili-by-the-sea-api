import { fetchSearchData } from './api'
const Moment = require('moment')
const MomentRange = require('moment-range')
const moment = MomentRange.extendMoment(Moment)

const createRange = (start, end) => {
  return moment.range(start, end)
}

const isOverlappingRanges = (primary, secondary) => {
  return primary.overlaps(secondary)
}

export default async ({ data }) => {
  const queryRange = createRange(data.a, data.b)
  const searchData =  await fetchSearchData()
  const { allRooms, allReservations } = searchData

  let reservedRoomIds = [];
  allReservations.map(reservation => {
    if (isOverlappingRanges(queryRange, createRange(reservation.arrivalDate, reservation.departureDate))) {
      return reservedRoomIds.push(...reservation.rooms)
    }
  })

  const filteredResults = allRooms.filter(item =>
    reservedRoomIds
      .map(filter => (filter.id === item.id))
      .map(val => val ? false : true)
      .reduce((acc, cum) => acc && cum, reservedRoomIds.length)
  )

  return {
    data: {
      availableRooms: reservedRoomIds.length > 0 ? filteredResults : allRooms
    }
  }
}