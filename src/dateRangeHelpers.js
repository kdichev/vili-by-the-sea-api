const Moment = require('moment')
const MomentRange = require('moment-range')
const moment = MomentRange.extendMoment(Moment)

export const createRange = (start, end) => moment.range(start, end)

export const isOverlappingRanges = (primary, secondary) => primary.overlaps(secondary)
