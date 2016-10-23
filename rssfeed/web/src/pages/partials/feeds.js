import React from 'react'
import {propOr} from 'ramda'

const Feeds = React.createClass({
  contextTypes: {
    appState: React.PropTypes.object
  },

  render() {
    const singleFeed = propOr([], 'singleFeed')(this.context.appState)
    return <ul>{singleFeed.map((f, i) =>
      <li key={f.title+i}><a href={f.link}>{f.title}</a>
        <div className="feed-element">{f.description}</div>
      </li>
      )}</ul>
  }
})

export default Feeds
