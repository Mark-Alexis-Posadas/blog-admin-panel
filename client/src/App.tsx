import { FC } from "react";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";

const App: FC = () => {
  return (
    <div>
      <Sidebar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/posts" element={<Dashboard />} />
        <Route path="/categories" element={<Dashboard />} />
        <Route path="/accounts" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default App;
