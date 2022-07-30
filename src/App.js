import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer";
import NavBar from "./Components/NavBar";
import AllMyApplications from "./Pages/AllMyApplications";
import AllServicesPage from "./Pages/AllServicesPage";
import ApplicationPage from "./Pages/ApplicationPage";
import CartPage from "./Pages/CartPage";

import MainPage from "./Pages/MainPage";

function App() {
  return (
    <div>
      {/* <MainPage /> */}
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/home" element={<MainPage />} />
        <Route path="/services" element={<AllServicesPage />} />
        <Route path="/application" element={<ApplicationPage />} />
        <Route path="/cartPage" element={<CartPage />} />
        <Route path="/myApplications" element={<AllMyApplications />} />
        {/* <Route path="/upcomingGames" element={<UpcomingGames />} /> */}
        {/* <Route path="/jobs" element={<Jobs />} /> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
