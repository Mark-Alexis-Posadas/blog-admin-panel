import { FC } from "react";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import { Posts } from "./pages/Posts";
import { Categories } from "./pages/Categories";
import { Accounts } from "./pages/Accounts";

const App: FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full ml-[250px] p-5 min-h-screen">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/accounts" element={<Accounts />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
