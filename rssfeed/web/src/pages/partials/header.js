import React from 'react'
import {Link} from 'react-router'

class Header extends React.Component {
  render() {
    return <div className="header">
      <div className="header-topic">
        <Link to="/" className="header-link">RSS-Feed</Link>
      </div>
    </div>
  }
}

export default Header
