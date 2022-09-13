import { Home } from "Page";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
    </Routes>
  );
}

export default App;
