import React from 'react'
import {Route} from 'react-router'
import FrontPage from './pages/frontPage'
import AppPage from './appPage'

export const Routes = (
  <Route component={AppPage}>
    <Route path="/"
      component={FrontPage}
      />
  </Route>
)

export default Routes