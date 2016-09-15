import React from 'react'
import {render} from 'react-dom'
import {Router, match, browserHistory} from 'react-router'
import {appState} from './store/rssStore'
import Routes from './routes'

let listener

const Main = React.createClass({
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
    const feedList = <ul>{this.state.feeds.map((f) => <li key={f.name}>{f.name} - {f.description} <a href={f.source}>Link</a></li>)}</ul>
    return <div>{feedList}</div>
  }
})

window.onload = () => {
  browserHistory.listen(() => {
  })

  match({routes: Routes, history: browserHistory}, (error, redirectLocation, renderProps) => {
    render(<Main renderProps={renderProps}></Main>, document.getElementById('content'))
  })
}