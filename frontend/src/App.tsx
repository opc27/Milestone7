import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { InputDesign } from "./components/index.js/InputDesign";
import ChatbotPage from "./components/chatbot/ChatInterface";
import { ChatButton } from "./components/ChatButton"; // Import the ChatButton
// import { Header } from "./components/index.js/Header"; 


function App() {
  return (
    <Router>
      {/* ChatButton is placed outside of Routes so it appears on every page */}
      <ChatButton />  
      <Routes>
        <Route path="/" element={<InputDesign />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
      </Routes>
    </Router>
  );
}

export default App;




{/* <Header /> This ensures the header is always present */}