import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { InputDesign } from "./components/index.js/InputDesign";
import ChatbotPage from "./components/chatbot/ChatInterface";
import { ChatButton } from "./components/sharedLayout/ChatButton"; // Import the ChatButton
import { ModuleList } from "./components/modules/ModuleList";
import { Header } from "./components/sharedLayout/Header";
import { StatusBar } from "./components/sharedLayout/StatusBar";
import { BottomBar } from "./components/sharedLayout/BottomBar";
import LoginPage from "./components/login/LoginPage";


function App() {
  return (
    <Router>
      {/* ChatButton is placed outside of Routes so it appears on every page */}
      <StatusBar/>
      <Header/>  
      <Routes>
        <Route path="/" element={<InputDesign />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/modules" element={<ModuleList />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <ChatButton/>
      <BottomBar/>
    </Router>
  );
}

export default App;




{/* <Header /> This ensures the header is always present */}