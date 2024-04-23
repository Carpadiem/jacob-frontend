// axios
import axios from 'axios'

// dev
export const api = axios.create({
  baseURL: 'http://localhost:3001/api',
})

// prod
// export const api = axios.create({
//   baseURL: 'https://jacobgame.ru/api',
// })