import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Send, Lightbulb, Trophy, ArrowLeft, CheckCircle, XCircle } from 'lucide-react'
import './Game.css'

const Game = ({ teams, questions, currentTeam, onSetCurrentTeam, onSubmitAnswer, onUseHint }) => {
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [showHint, setShowHint] = useState(false)

  const handleTeamSelect = (team) => {
    onSetCurrentTeam(team)
    setAnswer('')
    setFeedback(null)
    setShowHint(false)
  }

  const handleSubmitAnswer = (e) => {
    e.preventDefault()
    
    if (!answer.trim() || !currentTeam) return

    const usedHint = currentTeam.usedHints.has(currentTeam.currentQuestion)
    const isCorrect = onSubmitAnswer(currentTeam.id, answer, usedHint)
    
    if (isCorrect) {
      setFeedback({ type: 'success', message: 'Correct! Moving to next question...' })
      setAnswer('')
      setShowHint(false)
      
      // Auto-advance to next team or question
      setTimeout(() => {
        setFeedback(null)
        const nextTeamIndex = (teams.findIndex(t => t.id === currentTeam.id) + 1) % teams.length
        handleTeamSelect(teams[nextTeamIndex])
      }, 2000)
    } else {
      setFeedback({ type: 'error', message: 'Incorrect answer. Try again!' })
    }
  }

  const handleUseHint = () => {
    onUseHint(currentTeam.id)
    setShowHint(true)
  }

  const getCurrentQuestion = () => {
    if (!currentTeam || currentTeam.currentQuestion >= questions.length) {
      return null
    }
    return questions[currentTeam.currentQuestion]
  }

  const isGameComplete = () => {
    return teams.every(team => team.currentQuestion >= questions.length)
  }

  if (isGameComplete()) {
    return (
      <div className="game-complete">
        <div className="complete-content">
          <Trophy size={64} className="trophy-icon" />
          <h2>CyberHunt Complete!</h2>
          <p>All teams have finished the challenge</p>
          <Link to="/leaderboard" className="view-leaderboard-btn">
            <Trophy size={20} />
            View Final Results
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="game">
      <div className="game-header">
        <Link to="/" className="back-btn">
          <ArrowLeft size={20} />
          Back to Setup
        </Link>
        <h2>CyberHunt Challenge</h2>
        <Link to="/leaderboard" className="leaderboard-link">
          <Trophy size={20} />
          Leaderboard
        </Link>
      </div>

      <div className="game-content">
        <div className="teams-sidebar">
          <h3>Teams</h3>
          <div className="teams-list">
            {teams.map((team) => {
              const isActive = currentTeam?.id === team.id
              const isCompleted = team.currentQuestion >= questions.length
              const progress = Math.min((team.currentQuestion / questions.length) * 100, 100)
              
              return (
                <div
                  key={team.id}
                  className={`team-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                  onClick={() => !isCompleted && handleTeamSelect(team)}
                >
                  <div className="team-header">
                    <h4>{team.name}</h4>
                    <span className="team-score">{team.score} pts</span>
                  </div>
                  <div className="team-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">
                      {team.currentQuestion}/{questions.length}
                    </span>
                  </div>
                  {isCompleted && <CheckCircle size={16} className="completed-icon" />}
                </div>
              )
            })}
          </div>
        </div>

        <div className="game-main">
          {!currentTeam ? (
            <div className="select-team">
              <h3>Select a Team</h3>
              <p>Choose a team to start playing</p>
            </div>
          ) : (
            <div className="question-section">
              <div className="question-header">
                <h3>Question {currentTeam.currentQuestion + 1} of {questions.length}</h3>
                <div className="team-info">
                  <span>Team: {currentTeam.name}</span>
                  <span className="score">{currentTeam.score} points</span>
                </div>
              </div>

              <div className="question-content">
                <h4>{getCurrentQuestion()?.title}</h4>
                
                {showHint && (
                  <div className="hint-box">
                    <Lightbulb size={20} />
                    <p>{getCurrentQuestion()?.hint}</p>
                  </div>
                )}

                <form onSubmit={handleSubmitAnswer} className="answer-form">
                  <div className="input-group">
                    <input
                      type="text"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="Enter your answer..."
                      className="answer-input"
                    />
                    <button type="submit" className="submit-btn">
                      <Send size={20} />
                      Submit
                    </button>
                  </div>
                </form>

                {!showHint && !currentTeam.usedHints.has(currentTeam.currentQuestion) && (
                  <button onClick={handleUseHint} className="hint-btn">
                    <Lightbulb size={16} />
                    Use Hint (2 points)
                  </button>
                )}

                {feedback && (
                  <div className={`feedback ${feedback.type}`}>
                    {feedback.type === 'success' ? (
                      <CheckCircle size={20} />
                    ) : (
                      <XCircle size={20} />
                    )}
                    <span>{feedback.message}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Game 