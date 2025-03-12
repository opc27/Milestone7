import { Link } from 'react-router-dom'
import Chatbot from '../components/index.js/Chatbot'

function ChatbotPage() {
  return (
    <div className="chatbot-page">
      <div className="chatbot-container-wrapper">
        <Chatbot />
      </div>
      <div className="navigation">
        <Link to="/" className="nav-link">Back to Home</Link>
      </div>
    </div>
  )
}

export default ChatbotPage
