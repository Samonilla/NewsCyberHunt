import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Papa from 'papaparse'
import axios from 'axios'
import Header from './components/Header'
import TeamSetup from './components/TeamSetup'
import Game from './components/Game'
import Leaderboard from './components/Leaderboard'
import AdminPanel from './components/AdminPanel'
import './App.css'

function App() {
  const [teams, setTeams] = useState([])
  const [currentTeam, setCurrentTeam] = useState(null)
  const [questions, setQuestions] = useState([])
  const [gameStarted, setGameStarted] = useState(false)
  const [loading, setLoading] = useState(true)

  // Load questions from Google Sheets
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await axios.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vTteOhCv0kUJUO1MKgPAFT5cThiKSnmAl-b6BORgta6jUP-XDMGg9qqmoCLIR3Y5FT0Sf088Szp5gru/pub?output=csv')
        
        Papa.parse(response.data, {
          header: true,
          complete: (results) => {
            const parsedQuestions = results.data
              .filter(row => row.clue_id && row.title && row.answer_regex)
              .map((row, index) => ({
                id: parseInt(row.clue_id) || index + 1,
                title: row.title,
                answerRegex: row.answer_regex,
                hint: row.hint || '',
                points: 5,
                hintCost: 3
              }))
              .slice(0, 12) // Only use first 12 questions
            
            setQuestions(parsedQuestions)
            setLoading(false)
          },
          error: (error) => {
            console.error('Error parsing CSV:', error)
            setLoading(false)
          }
        })
      } catch (error) {
        console.error('Error loading questions:', error)
        setLoading(false)
      }
    }

    loadQuestions()
  }, [])

  const addTeam = (teamName) => {
    const newTeam = {
      id: Date.now(),
      name: teamName,
      score: 0,
      currentQuestion: 0,
      usedHints: new Set(),
      completedQuestions: new Set()
    }
    setTeams(prev => [...prev, newTeam])
  }

  const startGame = () => {
    if (teams.length > 0) {
      setGameStarted(true)
    }
  }

  const submitAnswer = (teamId, answer, usedHint) => {
    const team = teams.find(t => t.id === teamId)
    if (!team || team.currentQuestion >= questions.length) return

    const currentQ = questions[team.currentQuestion]
    const regex = new RegExp(currentQ.answerRegex, 'i')
    
    if (regex.test(answer.trim())) {
      // Check if the team used a hint for this specific question
      const hasUsedHint = team.usedHints.has(team.currentQuestion)
      const points = hasUsedHint ? 2 : 5
      
      const updatedTeam = {
        ...team,
        score: team.score + points,
        currentQuestion: team.currentQuestion + 1,
        completedQuestions: new Set([...team.completedQuestions, team.currentQuestion])
      }
      
      setTeams(prev => prev.map(t => t.id === teamId ? updatedTeam : t))
      return true
    }
    return false
  }

  const useHint = (teamId) => {
    const team = teams.find(t => t.id === teamId)
    if (!team || team.currentQuestion >= questions.length) return

    const updatedTeam = {
      ...team,
      usedHints: new Set([...team.usedHints, team.currentQuestion])
    }
    
    setTeams(prev => prev.map(t => t.id === teamId ? updatedTeam : t))
  }

  const resetGame = () => {
    setTeams([])
    setCurrentTeam(null)
    setGameStarted(false)
  }

  const stopGame = () => {
    setGameStarted(false)
  }

  const removeTeam = (teamId) => {
    setTeams(prev => prev.filter(t => t.id !== teamId))
    if (currentTeam?.id === teamId) {
      setCurrentTeam(null)
    }
  }

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <h2>Loading CyberHunt...</h2>
      </div>
    )
  }

  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={
                !gameStarted ? (
                  <TeamSetup 
                    teams={teams}
                    onAddTeam={addTeam}
                    onStartGame={startGame}
                  />
                ) : (
                  <Navigate to="/game" replace />
                )
              } 
            />
            <Route 
              path="/game" 
              element={
                gameStarted ? (
                  <Game 
                    teams={teams}
                    questions={questions}
                    currentTeam={currentTeam}
                    onSetCurrentTeam={setCurrentTeam}
                    onSubmitAnswer={submitAnswer}
                    onUseHint={useHint}
                  />
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
            <Route 
              path="/leaderboard" 
              element={
                <Leaderboard 
                  teams={teams}
                  questions={questions}
                />
              } 
            />
            <Route 
              path="/admin" 
              element={
                <AdminPanel 
                  teams={teams}
                  questions={questions}
                  gameStarted={gameStarted}
                  onStartGame={startGame}
                  onStopGame={stopGame}
                  onResetGame={resetGame}
                  onAddTeam={addTeam}
                  onRemoveTeam={removeTeam}
                />
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App 