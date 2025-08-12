import React, { useState } from 'react'
import { Users, Plus, Play, Trash2 } from 'lucide-react'
import './TeamSetup.css'

const TeamSetup = ({ teams, onAddTeam, onStartGame }) => {
  const [teamName, setTeamName] = useState('')
  const [error, setError] = useState('')

  const handleAddTeam = (e) => {
    e.preventDefault()
    
    if (!teamName.trim()) {
      setError('Please enter a team name')
      return
    }
    
    if (teams.some(team => team.name.toLowerCase() === teamName.toLowerCase())) {
      setError('Team name already exists')
      return
    }
    
    onAddTeam(teamName.trim())
    setTeamName('')
    setError('')
  }

  const handleRemoveTeam = (teamId) => {
    // This would need to be implemented in the parent component
    // For now, we'll just show the teams
  }

  return (
    <div className="team-setup">
      <div className="setup-header">
        <h2>Team Setup</h2>
        <p>Add teams to participate in the CyberHunt challenge</p>
      </div>

      <div className="setup-content">
        <div className="add-team-section">
          <h3>Add New Team</h3>
          <form onSubmit={handleAddTeam} className="add-team-form">
            <div className="input-group">
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Enter team name..."
                className="team-input"
                maxLength={50}
              />
              <button type="submit" className="add-btn">
                <Plus size={20} />
                Add Team
              </button>
            </div>
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>

        <div className="teams-list-section">
          <h3>Registered Teams ({teams.length})</h3>
          {teams.length === 0 ? (
            <div className="empty-state">
              <Users size={48} />
              <p>No teams added yet</p>
              <span>Add teams to start the game</span>
            </div>
          ) : (
            <div className="teams-grid">
              {teams.map((team, index) => (
                <div key={team.id} className="team-card">
                  <div className="team-info">
                    <div className="team-number">#{index + 1}</div>
                    <h4>{team.name}</h4>
                  </div>
                  <div className="team-actions">
                    <button 
                      className="remove-btn"
                      onClick={() => handleRemoveTeam(team.id)}
                      title="Remove team"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {teams.length > 0 && (
          <div className="start-game-section">
            <button 
              onClick={onStartGame}
              className="start-game-btn"
              disabled={teams.length === 0}
            >
              <Play size={20} />
              Start CyberHunt
            </button>
            <p className="start-hint">
              {teams.length} team{teams.length !== 1 ? 's' : ''} ready to hunt!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TeamSetup 