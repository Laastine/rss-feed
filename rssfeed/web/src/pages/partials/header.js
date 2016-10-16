import React from 'react'
import {Link} from 'react-router'

const Header = React.createClass({
  render() {
    return <div className="header">
      <div className="header-topic">
        <Link to="/" className="header-link">RSS-Feed</Link>
      </div>
    </div>
  }
})

export default Header