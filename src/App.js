import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer";
import NavBar from "./Components/NavBar";

import MainPage from "./Pages/MainPage";

function App() {
  return (
    <div>
      {/* <MainPage /> */}
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/home" element={<MainPage />} />
        {/* <Route path="/games" element={<GamesPage />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/prototype" element={<Prototype />} /> */}
        {/* <Route path="/upcomingGames" element={<UpcomingGames />} /> */}
        {/* <Route path="/jobs" element={<Jobs />} /> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
