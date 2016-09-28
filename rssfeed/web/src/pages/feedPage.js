import React from 'react'

const FeedPage = React.createClass({
  getInitialState() {
    return {
      singleFeed: []
    }
  },

  render() {
    const feedList = <ul>{this.state.singleFeed.map((f) =>
      <li key={f.title}>{f.link} - {f.description}</li>
    )}</ul>
    return (
      <div className="FeedPage">
        Feed page
        {feedList}
      </div>
    )
  }
})

export default FeedPage
