import React from 'react'
import PropTypes from 'prop-types'

class NotFoundPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div className='no-match-container'>
      <div className='no-match'>404 Page Not Found.</div>
      <a className='no-match-link' href='/'>Go to lukkarimaatti</a>
    </div>
  }
}

NotFoundPage.propTypes = {
  appState: PropTypes.object
}

export default NotFoundPage
