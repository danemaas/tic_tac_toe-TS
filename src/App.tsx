import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./pages/Game.tsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
