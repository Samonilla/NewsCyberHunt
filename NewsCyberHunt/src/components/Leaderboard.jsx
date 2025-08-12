import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Trophy, Medal, ArrowLeft, TrendingUp, Users } from 'lucide-react'
import './Leaderboard.css'

const Leaderboard = ({ teams, questions }) => {
  const [sortedTeams, setSortedTeams] = useState([])
  const [autoRefresh, setAutoRefresh] = useState(true)

  useEffect(() => {
    const sorted = [...teams].sort((a, b) => {
      // Sort by score (descending), then by questions completed (descending)
      if (b.score !== a.score) {
        return b.score - a.score
      }
      return b.currentQuestion - a.currentQuestion
    })
    setSortedTeams(sorted)
  }, [teams])

  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      const sorted = [...teams].sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score
        }
        return b.currentQuestion - a.currentQuestion
      })
      setSortedTeams(sorted)
    }, 2000)

    return () => clearInterval(interval)
  }, [teams, autoRefresh])

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy size={24} className="gold" />
      case 2:
        return <Medal size={24} className="silver" />
      case 3:
        return <Medal size={24} className="bronze" />
      default:
        return <span className="rank-number">{rank}</span>
    }
  }

  const getRankClass = (rank) => {
    switch (rank) {
      case 1:
        return 'rank-gold'
      case 2:
        return 'rank-silver'
      case 3:
        return 'rank-bronze'
      default:
        return ''
    }
  }

  const calculateProgress = (team) => {
    return Math.min((team.currentQuestion / questions.length) * 100, 100)
  }

  const getAverageScore = () => {
    if (teams.length === 0) return 0
    const total = teams.reduce((sum, team) => sum + team.score, 0)
    return Math.round(total / teams.length)
  }

  const getTotalQuestionsCompleted = () => {
    return teams.reduce((sum, team) => sum + team.currentQuestion, 0)
  }

  return (
    <div className="leaderboard">
      <div className="leaderboard-header">
        <Link to="/game" className="back-btn">
          <ArrowLeft size={20} />
          Back to Game
        </Link>
        <h2>Live Leaderboard</h2>
        <div className="refresh-controls">
          <label className="auto-refresh">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
            />
            <span>Auto-refresh</span>
          </label>
        </div>
      </div>

      <div className="stats-overview">
        <div className="stat-card">
          <Users size={24} />
          <div>
            <h4>{teams.length}</h4>
            <span>Teams</span>
          </div>
        </div>
        <div className="stat-card">
          <TrendingUp size={24} />
          <div>
            <h4>{getAverageScore()}</h4>
            <span>Avg Score</span>
          </div>
        </div>
        <div className="stat-card">
          <Trophy size={24} />
          <div>
            <h4>{getTotalQuestionsCompleted()}</h4>
            <span>Questions Completed</span>
          </div>
        </div>
      </div>

      <div className="leaderboard-content">
        {teams.length === 0 ? (
          <div className="empty-leaderboard">
            <Trophy size={64} />
            <h3>No Teams Yet</h3>
            <p>Teams will appear here once the game starts</p>
            <Link to="/" className="setup-link">
              Go to Setup
            </Link>
          </div>
        ) : (
          <div className="teams-list">
            {sortedTeams.map((team, index) => {
              const rank = index + 1
              const progress = calculateProgress(team)
              const isCompleted = team.currentQuestion >= questions.length
              
              return (
                <div key={team.id} className={`team-row ${getRankClass(rank)}`}>
                  <div className="rank">
                    {getRankIcon(rank)}
                  </div>
                  
                  <div className="team-info">
                    <h4>{team.name}</h4>
                    <div className="team-stats">
                      <span className="score">{team.score} points</span>
                      <span className="progress">
                        {team.currentQuestion}/{questions.length} questions
                      </span>
                      {isCompleted && <span className="completed-badge">Completed</span>}
                    </div>
                  </div>
                  
                  <div className="progress-section">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">{Math.round(progress)}%</span>
                  </div>
                  
                  <div className="hints-used">
                    <span className="hint-count">
                      {team.usedHints.size} hints used
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="leaderboard-footer">
        <div className="legend">
          <div className="legend-item">
            <div className="legend-color gold"></div>
            <span>1st Place</span>
          </div>
          <div className="legend-item">
            <div className="legend-color silver"></div>
            <span>2nd Place</span>
          </div>
          <div className="legend-item">
            <div className="legend-color bronze"></div>
            <span>3rd Place</span>
          </div>
        </div>
        
        <div className="scoring-info">
          <p>• Correct answer: 5 points</p>
          <p>• Correct answer with hint: 2 points</p>
          <p>• Teams are ranked by total score, then by questions completed</p>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard 