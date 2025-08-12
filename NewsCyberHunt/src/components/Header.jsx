import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Trophy, Users, Home } from 'lucide-react'
import './Header.css'

const Header = () => {
  const location = useLocation()

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <div className="logo-icon">🔍</div>
          <h1>News CyberHunt</h1>
        </Link>
        
        <nav className="nav">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            <Home size={20} />
            <span>Setup</span>
          </Link>
          <Link 
            to="/game" 
            className={`nav-link ${location.pathname === '/game' ? 'active' : ''}`}
          >
            <Users size={20} />
            <span>Game</span>
          </Link>
          <Link 
            to="/leaderboard" 
            className={`nav-link ${location.pathname === '/leaderboard' ? 'active' : ''}`}
          >
            <Trophy size={20} />
            <span>Leaderboard</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header 