import React from 'react'
import {render} from 'react-dom'
import {browserHistory, Route, RouterContext, Router} from 'react-router'
import FrontPage from './pages/frontPage'
import FeedPage from './pages/feedPage'
import {appState} from './store/rssStore'
import AppPage from './pages/appPage'
import {getFeedById, getFeeds} from './api/rssApi'

const routes =
  <Route component={AppPage}>
    <Route path="/"
           onEnter={() => appState.dispatch(getFeeds())}
           onChange={(_, nextState) => appState.dispatch(getFeedById(nextState.params.feedId))}
           component={FrontPage}/>
    <Route path="/feed/:feedId"
           onEnter={(nextState) => appState.dispatch(getFeedById(nextState.params.feedId))}
           onLeave={() => appState.dispatch({type: 'CLEAR_FEED_CONTENT'})}
           component={FeedPage}/>
  </Route>

const Main = React.createClass({
  getInitialState() {
    return {
      feeds: [],
      singleFeed: []
    }
  },

  childContextTypes: {
    appState: React.PropTypes.object
  },

  componentDidMount() {
    appState.changes().onValue((state) => {
      this.setState(state)
    })
  },

  getChildContext() {
    return {appState: this.state}
  },

  render() {
    return <Router history={browserHistory}>
      {routes}
    </Router>
  }
})


render(<Main/>, document.getElementById('content'))
