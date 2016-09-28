import React from 'react'

const App = React.createClass({
  contextTypes: {
    appState: React.PropTypes.object
  },

  render() {
    return (
      <div className="routerView">
        {this.props.children}
      </div>
    )
  }
})

export default App
