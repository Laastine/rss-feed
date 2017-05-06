import React from 'react'
import PropTypes from 'prop-types'
import {propOr} from 'ramda'

class Feeds extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    const singleFeed = propOr([], 'singleFeed')(this.context.appState)
    return <ul>{singleFeed.map((f, i) =>
      <li key={f.title+i}><a href={f.link}>{f.title}</a>
        <div className="feed-element">{f.description}</div>
      </li>
      )}</ul>
  }
}

Feeds.PropTypes = {
  appState: PropTypes.object
}

Feeds.contextTypes = {
  appState: PropTypes.object
}

export default Feeds
