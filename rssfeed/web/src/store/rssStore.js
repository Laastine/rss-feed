import Bacon from 'baconjs'
import {append, remove, findIndex, propEq} from 'ramda'

const initial = {}

const promiseMiddleware = (event) => {
  if (event && event.type && event.promise) {
    const {type, promise} = event
    const SUCCESS = `${type}_SUCCESS`
    const RETRY = `${type}_RETRY`
    promise
      .then((data) => appState.dispatch({type: (data.retry ? RETRY : SUCCESS), data}))
      .catch(() => {
        const FAILURE = `${type}_FAILURE`
        appState.dispatch({type: FAILURE, data: event.data})
      })
  }
}

const createAppState = (reducer, initial) => {
  const bus = Bacon.Bus()
  const store = bus.scan(initial, (state, action) => reducer(state, action))
  store.dispatch = (action) => {
    bus.push(action)
  }
  store.currentState = initial
  store.onValue((state) => {
    store.currentState = state
  })
  return store
}

function rootReducer(previousState, action) {
  let state = previousState
  promiseMiddleware(action)

  switch (action.type) {
    case 'LOAD_FEEDS_SUCCESS':
      state.feeds = action.data
      break
    case 'LOAD_FEED_CONTENT_SUCCESS':
      state.singleFeed = action.data
      break
    case 'CLEAR_FEED_CONTENT':
      state.singleFeed = []
      break
    case 'ADD_FEED_SUCCESS':
      state.feeds = append(action.data, state.feeds)
      break
    case 'ADD_FEED_FAILURE':
      alert(`Couldn't add feed`)
      break
    case 'DELETE_FEED_SUCCESS':
      const index = findIndex(propEq('name', action.data.name))(state.feeds)
      state.feeds = remove(index, 1, state.feeds)
      break
    case 'DELETE_FEED_FAILURE':
      alert(`Couldn't remove feed`)
      break
  }
  console.log(action.type, state)     // eslint-disable-line

  return state
}

export const appState = createAppState(rootReducer, initial)