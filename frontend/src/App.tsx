
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { InputDesign } from "./components/index.js/InputDesign";
import ChatbotPage from "./components/chatbot/ChatInterface";
import { ChatButton } from "./components/sharedLayout/ChatButton";
import { ModuleList } from "./components/modules/ModuleList";
import { ModulePage } from "./components/modules/ModulePage";
import { ModuleProvider } from "./components/modules/ModuleContext";
import { Header } from "./components/sharedLayout/Header";
import { StatusBar } from "./components/sharedLayout/StatusBar";
import { BottomBar } from "./components/sharedLayout/BottomBar";
import LoginPage from "./components/login/LoginPage";

// Create a wrapper component to use the useLocation hook
const AppContent = () => {
  const location = useLocation();
  const isChatbotPage = location.pathname === "/chatbot";

  return (
    <>
      {/* Always show StatusBar and Header */}
      <StatusBar />
      <Header />
      <Routes>
        <Route path="/" element={<InputDesign />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/modules" element={<ModuleList />} />
        <Route path="/modules/:moduleId" element={<ModulePage />} />
        <Route path="/login" element={<LoginPage />} />
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
      <ModuleProvider>
        <AppContent />
      </ModuleProvider>
    </Router>
  );
}

export default App;

{
  /* <Header /> This ensures the header is always present */
}
