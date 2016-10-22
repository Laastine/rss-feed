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

const FrontPage = React.createClass({
  getInitialState() {
    return {
      rssFeedToBeAdded: ''
    }
  },

  contextTypes: {
    appState: React.PropTypes.object
  },

  render() {
    const insertFeed =
      <form className="insertFeed-container">
        <label className="insertFeed-container-input-label">
          <input name="feedsource"
                 className="insertFeed-container-input-field"
                 type="text"
                 placeholder="Insert new feed URL"
                 onChange={(e) => this.setState({rssFeedToBeAdded: e.target.value})}
                 onKeyDown={handleKeyDown}></input></label><br/>
        <input className="insertFeed-container-input-button"
               action="submit" value="ADD FEED"
               onChange={() => {
               }}
               onClick={() => appState.dispatch(postNewFeed(this.state.rssFeedToBeAdded))}></input>
      </form>

    const {feeds} = this.context.appState
    const feedList = feeds && feeds.length > 0 ? <ul className="feedlist-container">{feeds.map((f) =>
      <li className="feedlist-element" key={f.name}><Link
        to={`/feed/${f.feedid}`}>{f.name}</Link>
        <div className="feedlist-element-remove" onClick={() => removeFeed(f.name)}>X</div>
      </li>
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
