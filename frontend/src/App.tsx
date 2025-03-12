import { Routes, Route } from 'react-router-dom'
import './App.css'
import './pages/Pages.css'
import HomePage from './pages/HomePage'
import ChatbotPage from './pages/ChatbotPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/chatbot" element={<ChatbotPage />} />
    </Routes>
  )
}

export default App
