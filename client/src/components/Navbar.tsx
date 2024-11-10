import { FC } from "react";
import { Link } from "react-router-dom";
export const Navbar: FC = () => {
  return (
    <nav className="border-b border-slate-300 py-5">
      <ul className="flex items-center justify-between max-w-[1100px] m-auto">
        <Link to="/">Home</Link>

        <ul className="flex items-center gap-3">
          <Link to="/blog">Blog</Link>
          <Link to="/about">about</Link>
        </ul>
      </ul>
    </nav>
  );
};
