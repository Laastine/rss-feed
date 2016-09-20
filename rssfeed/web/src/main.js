import React from 'react'
import {render} from 'react-dom'
import {Router, match, browserHistory} from 'react-router'
import {appState} from './store/rssStore'
import Routes from './routes'

let listener

const Main = React.createClass({
  componentDidMount() {
    listener = appState.changes().onValue((state) => this.setState(state))
  },

  componenWillUnmount() {
    listener()
  },

  render() {
    return <Router history={browserHistory}>
      {Routes}
    </Router>
  }
})

render(<Main/>, document.getElementById('content'))
