type Personality = {
  id: string;
  name: string;
  description: string;
  image: string;
};
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import { useAuth } from "./context/AuthContext";
import Persona from "./pages/Persona";
import { personalities } from "./data/personalities";

function App() {
  const auth = useAuth();

  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {auth?.isLoggedIn && auth.user && (
          <>
            <Route path="/persona" element={<Persona/>}/>
            <Route path="/persona/:name" element={<Persona/>}/>
                <Route path="/chat" element={<Chat selectedPersona={typeof auth.user === 'object' && (auth.user as Record<string, unknown>)?.persona ? personalities.find((p: Personality) => p.id === String((auth.user as Record<string, unknown>).persona)) : undefined} />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;