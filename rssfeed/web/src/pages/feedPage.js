import React from 'react'
import {Link} from 'react-router'

const FeedPage = React.createClass({
  contextTypes: {
    appState: React.PropTypes.object
  },

  render() {
    const {singleFeed} = this.context.appState
    const feedList = singleFeed.length > 0 ? <ul>{singleFeed.map((f) =>
      <li key={f.title}><a href={f.link}>{f.title}</a><div className="feed-element">{f.description}</div></li>
    )}</ul> : <img className='modal-ajax-spinner' src='/public/loader.gif'/>
    return (
      <div className="FeedPage">
        <div>
          <Link to="/" className="header-link">Home</Link>
        </div>
        {feedList}
      </div>
    )
  }
})

export default FeedPage
