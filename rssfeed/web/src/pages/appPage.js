import React from 'react'
import Footer from './partials/footer'
import Header from './partials/header'

const App = React.createClass({
  contextTypes: {
    appState: React.PropTypes.object
  },

  render() {
    return (
      <div className="routerView">
        <Header/>
        {this.props.children}
        <Footer/>
      </div>
    )
  }
})

export default App
