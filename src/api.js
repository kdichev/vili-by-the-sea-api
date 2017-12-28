import { GraphQLClient } from 'graphql-request'

const API_KEY = process.env.API_KEY

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