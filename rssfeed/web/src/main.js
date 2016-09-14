import React from 'react'
import {render} from 'react-dom'
import {Router, match, browserHistory} from 'react-router'
import {appState} from './store/rssStore'
import Routes from './routes'

let listener

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.props.state
  }

  componentDidMount() {
    listener = appState.changes().onValue((state) => this.setState(state))
  }

  componenWillUnmount() {
    listener()
  }

  render() {
    return <Router {...this.props.renderProps}/>
  }
}

window.onload = () => {
  browserHistory.listen(() => {
  })

  match({routes: Routes, history: browserHistory}, (error, redirectLocation, renderProps) => {
    render(<Main renderProps={renderProps}></Main>, document.getElementById('content'))
  })
}