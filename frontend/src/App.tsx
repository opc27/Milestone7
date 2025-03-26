import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { InputDesign } from './components/index.js/InputDesign';
import ChatbotPage from './components/chatbot/ChatInterface';
import { ChatButton } from './components/sharedLayout/ChatButton';
import { ModuleList } from './components/modules/ModuleList';
import { Header } from './components/sharedLayout/Header';
import { StatusBar } from './components/sharedLayout/StatusBar';
import { BottomBar } from './components/sharedLayout/BottomBar';
import LoginPage from './components/login/LoginPage';
import CreateAccount from './components/index.js/CreateAccount';
import ForgotUsername from './components/index.js/ForgotUsername';

// Create a wrapper component to use the useLocation hook
const AppContent = () => {
  const location = useLocation();
  const isChatbotPage = location.pathname === '/chatbot';

  return (
    <>
      {/* Always show StatusBar and Header */}
      <StatusBar />
      <Header />
      <Routes>
        <Route path="/" element={<InputDesign />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/modules" element={<ModuleList />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/createAccount" element={<CreateAccount />} />
        <Route path="/forgot" element={<ForgotUsername />} />
      </Routes>
      {/* Only show ChatButton and BottomBar if not on the chatbot page */}
      {!isChatbotPage && (
        <>
          <ChatButton />
          <BottomBar />
        </>
      )}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

{
  /* <Header /> This ensures the header is always present */
}
