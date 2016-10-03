import React from 'react'
import {Link} from 'react-router'
import {postNewFeed} from '../api/rssApi'

const FrontPage = React.createClass({
  contextTypes: {
    appState: React.PropTypes.object
  },

  render() {
    const handleKeyDown = (e) => {
      if (e.keyCode === 13) { //Enter
        postNewFeed(e.target.value)
      }
    }

    const feedList = <ul className="feedlist-container">{this.context.appState.feeds.map((f) =>
      <li className="feedlist-element" key={f.name}>{f.name} - {f.description} <Link
        to={`/feed/${f.feedid}`}>Link</Link></li>
    )}</ul>

    const insertFeed = <div className="insertFeed-container">
      <input name="feedsource"
             type="text"
             onKeyDown={handleKeyDown}></input>
    </div>

    return (
      <div className="frontPage">
        <div className="header">
          <Link to="/" className="header-link">Home</Link>
          <div className="frontPage">Frontpage</div>
          {insertFeed}
        </div>
        {feedList}
      </div>
    )
  }
})

export default FrontPage
