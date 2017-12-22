const Moment = require('moment')
const MomentRange = require('moment-range')
const moment = MomentRange.extendMoment(Moment)
const fetch = require('node-fetch')

const API_LINK = 'https://api.graph.cool/simple/v1/cjba2txd62g5p0182pezwuy1z'
const reservationsQuery = `
      query {
        allReservations {
          id
          arrivalDate
		  departureDate
        }
      }
    `

const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MTM1MTQwNTAsImNsaWVudElkIjoiY2o5ZDBxN21tMHY3cjAxNDBzMGlydzEyZSIsInByb2plY3RJZCI6ImNqYmEydHhkNjJnNXAwMTgycGV6d3V5MXoiLCJwZXJtYW5lbnRBdXRoVG9rZW5JZCI6ImNqYmFyNnJnbjA1czUwMTgxc2x6dXFyd3IifQ.iU03bMVJpzmcrYdWIiVe7TRZQtuNdacULfFC91fluPA'
    },
	body: JSON.stringify({ 
      query: reservationsQuery 
    })
}

async function fetchAsync() {
  let response = await fetch(API_LINK, opetions);
  let data = await response.json();
  return data;
}

export default async event => {
  console.log(event.data)
  return {
    data: {
      sum: {
        hey: 'hey'
      }
    }
  }
}