import "./App.scss";
import GlassesPage from "./Pages/GlassesPage";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/collections">
          <Route index={true} path=":name" element={<GlassesPage />}></Route>
          <Route
            path=""
            element={<Navigate replace to="/collections/spectacles-women" />}
          ></Route>
        </Route>
        <Route
          path="*"
          element={<Navigate replace to="/collections/spectacles-women" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
