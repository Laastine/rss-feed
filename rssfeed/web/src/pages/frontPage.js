import React from 'react'
import PropTypes from 'prop-types'
import Feeds from './partials/feeds'
import {appState} from '../store/rssStore'
import {getFeedById, postNewFeed} from '../api/rssApi'

const handleKeyDown = (e) => {
  if (e.keyCode === 13) { //Enter
    appState.dispatch(postNewFeed(e.target.value))
  }
}

class FrontPage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      rssFeedToBeAdded: '',
      showFeedContent: false
    }
  }

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
               readOnly="true"
               onClick={() => appState.dispatch(postNewFeed(this.state.rssFeedToBeAdded))}></input>
      </form>

    const {feeds, selectedFeedId} = this.context.appState
    const feedList = feeds && feeds.length > 0 ? <div>
      <ul className="feedlist-container">{feeds.map((f) =>
        <li className={`feedlist-element${(f.feedid === Number(selectedFeedId) ? '-selected' : '')}`}
            key={f.name}
            onClick={() => {
              this.setState({showFeedContent: !this.state.showFeedContent})
              appState.dispatch(getFeedById(f.feedid))
            }}>{f.name}
        </li>
      )}</ul>
    </div> : <img className='modal-ajax-spinner' src='/public/loader.gif'/>

    return (
      <div className="frontPage">
        <div>
          {insertFeed}
        </div>
        <div className="frontPage-container">
          {feedList}
          <div className="feed-preview-container">
            <Feeds/>
          </div>
        </div>
      </div>
    )
  }
}

FrontPage.PropTypes = {
  appState: PropTypes.object
}

FrontPage.contextTypes = {
  appState: PropTypes.object
}

export default FrontPage
