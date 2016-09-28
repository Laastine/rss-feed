import React from 'react'
import {Link} from 'react-router'

const FrontPage = React.createClass({
  contextTypes: {
    appState: React.PropTypes.object
  },

  render() {
    const feedList = <ul>{this.context.appState.feeds.map((f) =>
      <li key={f.name}>{f.name} - {f.description} <Link to={`/feed/${f.feedid}`}>Link</Link></li>
    )}</ul>
    return (
      <div className="frontPage">
        Etusivu
        {feedList}
      </div>
    )
  }
})

export default FrontPage
