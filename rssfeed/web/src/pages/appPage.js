import React from 'react'
import PropTypes from 'prop-types'
import Footer from './partials/footer'
import Header from './partials/header'

class App extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <div className="routerView">
        <Header/>
        {this.props.children}
        <Footer/>
      </div>
    )
  }
}

App.PropTypes = {
  appState: PropTypes.object
}

App.contextTypes = {
  appState: PropTypes.object
}

export default App
