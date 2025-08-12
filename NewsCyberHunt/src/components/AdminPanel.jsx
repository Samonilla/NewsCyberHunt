import React, { useState } from 'react'
import { Shield, Play, Pause, RotateCcw, LogOut, Users, Trophy, Settings } from 'lucide-react'
import './AdminPanel.css'

const AdminPanel = ({ 
  teams, 
  questions, 
  gameStarted, 
  onStartGame, 
  onStopGame, 
  onResetGame,
  onAddTeam,
  onRemoveTeam 
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [newTeamName, setNewTeamName] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    if (username === 'admin' && password === 'Samonilla') {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Invalid credentials')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUsername('')
    setPassword('')
  }

  const handleAddTeam = (e) => {
    e.preventDefault()
    if (newTeamName.trim()) {
      onAddTeam(newTeamName.trim())
      setNewTeamName('')
    }
  }

  const handleRemoveTeam = (teamId) => {
    onRemoveTeam(teamId)
  }

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="login-container">
          <div className="login-header">
            <Shield size={48} className="admin-icon" />
            <h2>Admin Access</h2>
            <p>Enter credentials to access admin controls</p>
          </div>
          
          <form onSubmit={handleLogin} className="login-form">
            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
            </div>
            
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
            
            {error && <p className="error-message">{error}</p>}
            
            <button type="submit" className="login-btn">
              <Shield size={20} />
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <div className="admin-info">
          <Shield size={24} />
          <h2>Admin Control Panel</h2>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          <LogOut size={20} />
          Logout
        </button>
      </div>

      <div className="admin-content">
        <div className="admin-section">
          <h3>Game Controls</h3>
          <div className="control-buttons">
            {!gameStarted ? (
              <button onClick={onStartGame} className="control-btn start-btn" disabled={teams.length === 0}>
                <Play size={20} />
                Start Game
              </button>
            ) : (
              <button onClick={onStopGame} className="control-btn stop-btn">
                <Pause size={20} />
                Stop Game
              </button>
            )}
            
            <button onClick={onResetGame} className="control-btn reset-btn">
              <RotateCcw size={20} />
              Reset Game
            </button>
          </div>
        </div>

        <div className="admin-section">
          <h3>Team Management</h3>
          <form onSubmit={handleAddTeam} className="add-team-form">
            <input
              type="text"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
              placeholder="Enter team name"
              maxLength={50}
            />
            <button type="submit" className="add-team-btn">
              <Users size={16} />
              Add Team
            </button>
          </form>
          
          <div className="teams-list">
            <h4>Current Teams ({teams.length})</h4>
            {teams.length === 0 ? (
              <p className="no-teams">No teams added yet</p>
            ) : (
              <div className="teams-grid">
                {teams.map((team, index) => (
                  <div key={team.id} className="team-item">
                    <div className="team-info">
                      <span className="team-number">#{index + 1}</span>
                      <span className="team-name">{team.name}</span>
                      <span className="team-score">{team.score} pts</span>
                    </div>
                    <button 
                      onClick={() => handleRemoveTeam(team.id)}
                      className="remove-team-btn"
                      title="Remove team"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="admin-section">
          <h3>Game Statistics</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <Users size={24} />
              <div>
                <h4>{teams.length}</h4>
                <span>Teams</span>
              </div>
            </div>
            <div className="stat-card">
              <Trophy size={24} />
              <div>
                <h4>{questions.length}</h4>
                <span>Questions</span>
              </div>
            </div>
            <div className="stat-card">
              <Settings size={24} />
              <div>
                <h4>{gameStarted ? 'Active' : 'Inactive'}</h4>
                <span>Status</span>
              </div>
            </div>
          </div>
        </div>

        <div className="admin-section">
          <h3>Questions Preview</h3>
          <div className="questions-list">
            {questions.slice(0, 5).map((question, index) => (
              <div key={question.id} className="question-item">
                <span className="question-number">Q{index + 1}</span>
                <p className="question-text">{question.title}</p>
              </div>
            ))}
            {questions.length > 5 && (
              <p className="more-questions">... and {questions.length - 5} more questions</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel 