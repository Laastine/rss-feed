import React from 'react'
import Feeds from './partials/feeds'
import {appState} from '../store/rssStore'
import {deleteNewFeed} from '../api/rssApi'

const removeFeed = (feedName) => {
  appState.dispatch(deleteNewFeed(feedName))
}

const FeedPage = React.createClass({
  contextTypes: {
    appState: React.PropTypes.object
  },

  render() {
    const {singleFeed} = this.context.appState
    const feedList = singleFeed.length > 0 ? <Feeds/> : <img className='modal-ajax-spinner' src='/public/loader.gif'/>
    return (
      <div className="FeedPage">
        <button className="feedlist-element-remove" onClick={() => removeFeed(singleFeed.name)}>UNSUBSCRIBE</button>
        {feedList}
      </div>
    )
  }
})

export default FeedPage
