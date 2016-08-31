import React from 'react'
import {render} from 'react-dom'

class Main extends React.Component {
  render() {
    return <div className="main">RSS-feed</div>
  }
}

render(<Main/>, document.getElementById('content'))
