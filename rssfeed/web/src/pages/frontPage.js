import React from 'react'
import {Link} from 'react-router'
import {appState} from '../store/rssStore'

let listener

const App = React.createClass({
  getInitialState() {
    return {
      feeds: []
    }
  },

  componentDidMount() {
    listener = appState.changes().onValue((state) => this.setState(state))
  },

  componenWillUnmount() {
    listener()
  },

  render() {
    const feedList = <ul>{this.state.feeds.map((f) =>
      <li key={f.name}>{f.name} - {f.description} <Link to={`/feed/${f.feedid}`}>Link</Link></li>
    )}</ul>
    return (
      <div className="frontPage">
        Etusivu
        {feedList}
      </div>
    )
  }
})

export default App
