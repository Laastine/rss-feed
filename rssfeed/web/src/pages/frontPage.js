import React from 'react'
import {Link} from 'react-router'

const FrontPage = React.createClass({
  contextTypes: {
    appState: React.PropTypes.object
  },

  render() {
    const feedList = <ul className="feedlist-container">{this.context.appState.feeds.map((f) =>
      <li className="feedlist-element" key={f.name}>{f.name} - {f.description} <Link to={`/feed/${f.feedid}`}>Link</Link></li>
    )}</ul>

    return (
      <div className="frontPage">
        <div className="header">
          <Link to="/" className="header-link">Home</Link>
          <div className="frontPage">Frontpage</div>
        </div>
        {feedList}
      </div>
    )
  }
})

export default FrontPage
