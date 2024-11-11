import { FC } from "react";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import { Posts } from "./pages/Posts";
import { Categories } from "./pages/Categories";
import { Accounts } from "./pages/Accounts";

const App: FC = () => {
  return (
    <div>
      <Sidebar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/accounts" element={<Accounts />} />
      </Routes>
    </div>
  );
};

export default App;
