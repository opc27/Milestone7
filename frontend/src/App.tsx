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
        <Route path="/home" element={<InputDesign />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/modules" element={<ModuleList />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/createAccount" element={<CreateAccount />} />
        <Route path="/forgot" element={<ForgotUsername />} />
        <Route path="/modules/:moduleId" element={<ModulePage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
      {/* Chat button and bottom bar removed as requested */}
    </>
  );
};

function App() {
  return (
    <Router>
      <ScriptureProvider>
        <ModuleProvider>
          <AppContent />
        </ModuleProvider>
      </ScriptureProvider>
    </Router>
  );
}

export default App;

{
  /* <Header /> This ensures the header is always present */
}
