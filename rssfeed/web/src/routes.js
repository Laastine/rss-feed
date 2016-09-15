import React from 'react'
import {Route} from 'react-router'
import FrontPage from './pages/frontPage'
import {appState} from './store/rssStore'
import {getFeeds} from './api/rssApi'

export const Routes = (
  <Route path="/"
         onEnter={() => appState.dispatch(getFeeds())}
         component={FrontPage}
  />
)

export default Routes