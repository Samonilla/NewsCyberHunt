import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Trophy, Users, Home, Shield } from 'lucide-react'
import './Header.css'

const Header = () => {
  const location = useLocation()

  return (
    <header className="header">
      <div className="daily-cal-banner">
        <h1>The Daily Californian</h1>
      </div>
      <div className="header-content">
        <div className="logo-section">
          <Link to="/" className="logo">
            <div className="logo-icon">🔍</div>
            <h2>CyberHunt</h2>
          </Link>
          <p className="news-dept">News Department</p>
        </div>
        
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
          <Link 
            to="/admin" 
            className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}
          >
            <Shield size={20} />
            <span>Admin</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header 