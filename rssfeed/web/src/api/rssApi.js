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

export const getFeedById = (feedId) =>
  ({type: 'LOAD_FEED_CONTENT', promise: serverApi.get(`/api/feedContentById/${feedId}`).then(checkStatus)})

export const postNewFeed = (source) =>
  ({type: 'ADD_FEED', promise: serverApi.post('/api/newFeed', {source}).then(checkStatus)})
