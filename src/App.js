import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";

import Spinner from "./components/Spinner/Spinner";

const CoursesPage = lazy(() => import("./pages/CoursesPage"));
const CoursePage = lazy(() => import("./pages/CoursePage"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/courses" element={<CoursesPage />}></Route>
          <Route path="/courses/:courseId" element={<CoursePage />}></Route>
          <Route path="*" element={<Navigate to="/courses" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
