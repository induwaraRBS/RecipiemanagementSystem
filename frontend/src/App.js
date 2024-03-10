import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Createrecipies from "./Pages/createrecipe";
import Userauth from "./Pages/userauth";
import Navbar from "./components/navbar";
import Updaterecipie from "./Pages/updaterecipie";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createrecipies" element={<Createrecipies />} />
          <Route path="/userauth" element={<Userauth />} />
          <Route path="/updaterecipies/:id" element={<Updaterecipie />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
