import { FC } from "react";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { Blog } from "./pages/Blog";
import { About } from "./pages/About";

const App: FC = () => {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default App;
