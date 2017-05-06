import React from 'react'
import PropTypes from 'prop-types'
import {render} from 'react-dom'
import {browserHistory, Route, Router} from 'react-router'
import FrontPage from './pages/frontPage'
import FeedPage from './pages/feedPage'
import {appState} from './store/rssStore'
import AppPage from './pages/appPage'
import {getFeedById, getFeeds} from './api/rssApi'

const routes =
  <Route component={AppPage}>
    <Route path="/"
           onEnter={(nextState) => {
             if (nextState.location.query.feedId) {
               appState.dispatch(getFeedById(nextState.location.query.feedId))
             }
             appState.dispatch(getFeeds())
           }}
           component={FrontPage}/>
    <Route path="/feed/:feedId"
           onEnter={(nextState) => appState.dispatch(getFeedById(nextState.params.feedId))}
           onLeave={() => appState.dispatch({type: 'CLEAR_FEED_CONTENT'})}
           component={FeedPage}/>
  </Route>

class Main extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      feeds: [],
      singleFeed: []
    }
  }

  componentDidMount() {
    appState.changes().onValue((state) => {
      this.setState(state)
    })
  }

  getChildContext() {
    return {appState: this.state}
  }

  render() {
    return <Router history={browserHistory}>
      {routes}
    </Router>
  }
}

Main.PropTypes = {
  appState: PropTypes.object
}

Main.childContextTypes = {
  appState: PropTypes.object
}

render(<Main/>, document.getElementById('content'))
