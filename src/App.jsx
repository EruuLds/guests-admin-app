import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { DataContext } from "./contexts/DataContext";
import { useContext } from "react";
import Auth from "./pages/Auth";
import { ProtectedRoute } from "./components/prefabs/ProtectedRoute";

function App() {
  const { user } = useContext(DataContext);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Auth/>}/>
          <Route path="/auth" element={<Auth/>}/>
          <Route element={<ProtectedRoute user={user}/>}>
            <Route path="/dashboard" element={<Dashboard/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;