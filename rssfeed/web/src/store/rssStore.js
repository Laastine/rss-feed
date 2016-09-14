import Bacon from "baconjs"

const initial = {}

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
  switch (action.type) {
    case 'CHECK_FEEDS':
      break
  }
}

export const appState = createAppState(rootReducer, initial)