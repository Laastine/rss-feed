import axios from 'axios'

const serverApi = axios.create({})

export const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response.data
  } else {
    return response
  }
}

export const getFeeds = () => ({type: 'LOAD_FEEDS', promise: serverApi.get('/api/feeds').then(checkStatus)})
