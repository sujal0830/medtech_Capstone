import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Authentication Page */}
        <Route path="/" element={<AuthPage />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;