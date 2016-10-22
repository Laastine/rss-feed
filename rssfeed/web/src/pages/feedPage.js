import React from 'react'
import Feeds from './partials/feeds'

const FeedPage = React.createClass({
  contextTypes: {
    appState: React.PropTypes.object
  },

  render() {
    const {singleFeed} = this.context.appState
    const feedList = singleFeed.length > 0 ? <Feeds/> : <img className='modal-ajax-spinner' src='/public/loader.gif'/>
    return (
      <div className="FeedPage">
        <div>
        </div>
        {feedList}
      </div>
    )
  }
})

export default FeedPage
