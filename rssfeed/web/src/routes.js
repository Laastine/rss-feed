import React from 'react'
import {Route, RouterContext, Router, browserHistory} from 'react-router'
import App from './pages/appPage'
import frontPage from './pages/frontPage'
import FeedPage from './pages/feedPage'
import {appState} from './store/rssStore'
import {getFeedById, getFeeds} from './api/rssApi'

const Routes =
    <Route component={App}>
      <Route path="/"
             onEnter={() => appState.dispatch(getFeeds())}
             component={frontPage}
      />
      <Route path="/feed/:feedId"
             onEnter={(nextState) => appState.dispatch(getFeedById(nextState.params.feedId))}
             component={FeedPage}
      />
    </Route>


export default Routes