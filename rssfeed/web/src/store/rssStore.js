import Bacon from "baconjs"

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
  }
  console.log(action.type, state)     // eslint-disable-line

  return state
}

export const appState = createAppState(rootReducer, initial)