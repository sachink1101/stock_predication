import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import StockNews from "./Components/News";
import Privacy from "./Components/Privacy";
import About from "./Components/About";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/news" element={<StockNews />} />
        <Route path="/policy" element={<Privacy />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
