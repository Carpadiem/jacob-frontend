// axios
import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://185.250.44.55:3001/api',
  headers: {
    'Content-Type': 'application/json'
  }
})