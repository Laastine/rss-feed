import React from 'react'

const App = React.createClass({
  render() {
    return (
      <div className="routerView">
        {this.props.children}
      </div>
    )
  }
})

export default App
