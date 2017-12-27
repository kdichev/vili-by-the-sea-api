import { GraphQLClient } from 'graphql-request'

const API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MTM1MTQwNTAsImNsaWVudElkIjoiY2o5ZDBxN21tMHY3cjAxNDBzMGlydzEyZSIsInByb2plY3RJZCI6ImNqYmEydHhkNjJnNXAwMTgycGV6d3V5MXoiLCJwZXJtYW5lbnRBdXRoVG9rZW5JZCI6ImNqYmFyNnJnbjA1czUwMTgxc2x6dXFyd3IifQ.iU03bMVJpzmcrYdWIiVe7TRZQtuNdacULfFC91fluPA'

const client = new GraphQLClient(process.env.API_URL, {
  headers: {
    Authorization: API_KEY,
  }
});

export const fetchSearchData = () => {
  return client.request(`
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
        roomId
        floor
        imgUrl
        roomTypes {
          beds
          type
          rates {
            price
          }
        }
      }
    }
  `)
}