import "./App.css";

import { Routes, Route } from "react-router-dom";

import Authentication from "./routes/authentication/authentication";

import Home from "./routes/home/home";

import Navigation from "./routes/Navigation/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function App() {
  const { currentUser } = useSelector((store) => store.user);

  return (
    <Routes>
      <Route
        path="/"
        element={currentUser ? <Navigate to="/app" /> : <Authentication />}
      />
      <Route path="app" element={<Navigation />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
