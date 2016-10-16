import React from 'react'
import {Link} from 'react-router'
import {appState} from '../store/rssStore'
import {postNewFeed, deleteNewFeed} from '../api/rssApi'

const removeFeed = (feedName) => {
  appState.dispatch(deleteNewFeed(feedName))
}


const handleKeyDown = (e) => {
  if (e.keyCode === 13) { //Enter
    appState.dispatch(postNewFeed(e.target.value))
  }
}

const insertFeed = <div className="insertFeed-container">
  <input name="feedsource"
         type="text"
         onKeyDown={handleKeyDown}></input>
</div>

const FrontPage = React.createClass({
  contextTypes: {
    appState: React.PropTypes.object
  },

  render() {
    const feedList = <ul className="feedlist-container">{this.context.appState.feeds.map((f) =>
      <li className="feedlist-element" key={f.name}><Link
        to={`/feed/${f.feedid}`}>{f.name}</Link><div className="feedlist-element-remove" onClick={() => removeFeed(f.name)}>X</div></li>
    )}</ul>

    return (
      <div className="frontPage">
        <div>
          {insertFeed}
        </div>
        {feedList}
      </div>
    )
  }
})

export default FrontPage
