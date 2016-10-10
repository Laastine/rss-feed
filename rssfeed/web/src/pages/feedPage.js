import React from 'react'
import {Link} from 'react-router'

const FeedPage = React.createClass({
  contextTypes: {
    appState: React.PropTypes.object
  },

  render() {
    const feedList = <ul>{this.context.appState.singleFeed.map((f) =>
      <li key={f.title}><a href={f.link}>{f.title}</a><div className="feed-element">{f.description}</div></li>
    )}</ul>
    return (
      <div className="FeedPage">
        <div className="header">
          <Link to="/" className="header-link">Home</Link>
          Feed page
        </div>
        {feedList}
      </div>
    )
  }
})

export default FeedPage
