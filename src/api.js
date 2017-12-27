const fetch = require('node-fetch')

const API_LINK = process.env.API_URL

const searchQuery = `
  query {
    allReservations {
      id
      arrivalDate
      departureDate
      rooms {
        id
      }
    }
    allRooms {
      id
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
    query: searchQuery
  })
}

export const fetchSearchData = async () => {
  let response = await fetch(API_LINK, options);
  let data = await response.json();
  return data.data;
}