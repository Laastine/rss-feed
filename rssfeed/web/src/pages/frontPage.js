import React from 'react'
import {Link} from 'react-router'
import Feeds from './partials/feeds'
import {appState} from '../store/rssStore'
import {postNewFeed, deleteNewFeed, getFeedById} from '../api/rssApi'

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
      rssFeedToBeAdded: '',
      showFeedContent: false
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
    const feedList = feeds && feeds.length > 0 ? <div>
      <ul className="feedlist-container">{feeds.map((f) =>
        <li className="feedlist-element" key={f.name} onClick={() => {
          this.setState({showFeedContent: !this.state.showFeedContent})
          appState.dispatch(getFeedById(f.feedid))
        }}><Link
          to={`/feed/${f.feedid}`}>{f.name}</Link>
          <div className="feedlist-element-remove" onClick={() => removeFeed(f.name)}>X</div>
        </li>
      )}</ul>
    </div> : <img className='modal-ajax-spinner' src='/public/loader.gif'/>

    const feedPreview = <div className="feed-preview-container">
      <Feeds/>
    </div>

    return (
      <div className="frontPage">
        <div>
          {insertFeed}
        </div>
        <div className="frontPage-container">
          {feedList}
          {feedPreview}
        </div>
      </div>
    )
  }
})

export default FrontPage
