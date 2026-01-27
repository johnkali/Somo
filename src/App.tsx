import './App.css'
import Login from "./components/Login.tsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes.tsx";
import Home from "./pages/Home.tsx";
import Register from "./components/Register.tsx";
function App() {

;
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />

              <Route
                  path="/"
                  element={
                      <ProtectedRoutes>
                          <Home />
                      </ProtectedRoutes>
                  }
              />
          </Routes>
      </BrowserRouter>
  )
}

export default App
