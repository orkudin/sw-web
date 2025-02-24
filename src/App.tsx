import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import People from "./pages/People";
import EntityDetail from "./pages/EntityDetail";
import Films from "./pages/Films";
import Planets from "./pages/Planets";
import Species from "./pages/Species";
import Starships from "./pages/Starships";
import Vehicles from "./pages/Vehicles";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/people" element={<People />} />
          <Route path="/people/:id" element={<EntityDetail type="people" />} />
          <Route path="/planets" element={<Planets />} />
          <Route path="/planets/:id" element={<EntityDetail type="planets" />} />
          <Route path="/starships" element={<Starships />} />
          <Route path="/starships/:id" element={<EntityDetail type="starships" />} />
          <Route path="/films" element={<Films />} />
          <Route path="/films/:id" element={<EntityDetail type="films" />} />
          <Route path="/species" element={<Species />} />
          <Route path="/species/:id" element={<EntityDetail type="species" />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/vehicles/:id" element={<EntityDetail type="vehicles" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;