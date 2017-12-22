import { fetchSearchData } from './api'
const Moment = require('moment')
const MomentRange = require('moment-range')
const moment = MomentRange.extendMoment(Moment)

const createRange = (start, end) => {
  return moment.range(start, end)
}

const isRangesOverlapping = (primary, secondary) => {
  return primary.overlaps(secondary)
}


export default async ({ data }) => {
  const queryRange = createRange(data.a, data.b)
  const searchData =  await fetchSearchData()
  return {
    data: {
      availableRooms: searchData
    }
  }
}