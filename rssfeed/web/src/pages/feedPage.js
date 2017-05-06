import React from 'react'
import PropTypes from 'prop-types'
import Feeds from './partials/feeds'
import {appState} from '../store/rssStore'
import {deleteNewFeed} from '../api/rssApi'

const removeFeed = (feedName) => {
  appState.dispatch(deleteNewFeed(feedName))
}

class FeedPage extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

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
}

FeedPage.PropTypes = {
  appState: PropTypes.object
}

FeedPage.contextTypes = {
  appState: PropTypes.object
}

export default FeedPage
