import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Categories/Home";
import People from "./pages/Categories/People";
import EntityDetail from "./pages/EntityDetail";
import Films from "./pages/Categories/Films";
import Planets from "./pages/Categories/Planets";
import Species from "./pages/Categories/Species";
import Starships from "./pages/Categories/Starships";
import Vehicles from "./pages/Categories/Vehicles";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/people" element={<People />} />
          <Route path="/people/:id" element={<EntityDetail key={window.location.pathname} type="people" />} />
          <Route path="/planets" element={<Planets />} />
          <Route path="/planets/:id" element={<EntityDetail type="planets" />} />
          <Route path="/starships" element={<Starships />} />
          <Route path="/starships/:id" element={<EntityDetail type="starships" />} />
          <Route path="/films" element={<Films  key={window.location.pathname}/>} />
          <Route path="/films/:id" element={<EntityDetail key={window.location.pathname} type="films" />} />
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