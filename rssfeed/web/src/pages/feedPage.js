import React from 'react'
import {Link} from 'react-router'

const FeedPage = React.createClass({
  getInitialState() {
    return {
      singleFeed: []
    }
  },

  render() {
    const feedList = <ul>{this.state.singleFeed.map((f) =>
      <li key={f.title}>{f.link} - {f.description}</li>
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
