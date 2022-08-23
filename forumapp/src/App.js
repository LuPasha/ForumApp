import { Routes, Route } from "react-router-dom";

import Authentication from "./routes/authentication/authentication";

import Home from "./routes/home/home";

import Navigation from "./routes/Navigation/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import AllChannels from "./routes/all-channels/all-channels";
import AllDirectMessages from "./routes/all-direct-messages/all-direct-messages";

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
        <Route path="ac/*" element={<AllChannels />} />
        <Route path="adm/*" element={<AllDirectMessages />} />
      </Route>
    </Routes>
  );
}

export default App;
