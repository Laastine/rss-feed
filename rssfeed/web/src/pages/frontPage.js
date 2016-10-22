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
         className="insertFeed-container-input"
         placeholder="Insert new feed URL"
         onKeyDown={handleKeyDown}></input>
</div>

const FrontPage = React.createClass({
  contextTypes: {
    appState: React.PropTypes.object
  },

  render() {
    const {feeds} = this.context.appState
    const feedList = feeds && feeds.length > 0 ? <ul className="feedlist-container">{feeds.map((f) =>
      <li className="feedlist-element" key={f.name}><Link
        to={`/feed/${f.feedid}`}>{f.name}</Link><div className="feedlist-element-remove" onClick={() => removeFeed(f.name)}>X</div></li>
    )}</ul> : <img className='modal-ajax-spinner' src='/public/loader.gif'/>

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
