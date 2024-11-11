import { FC } from "react";
import { Link } from "react-router-dom";
export const Sidebar: FC = () => {
  return (
    <aside className="border-r border-slate-300 py-5 h-screen overflow-hidden fixed top-0">
      <ul className="flex items-center justify-between max-w-[1100px] m-auto">
        <Link to="/">Dashboard</Link>

        <ul className="flex items-center gap-3">
          <Link to="/posts">Posts</Link>
          <Link to="/category">Categories</Link>
          <Link to="/accounts">Accounts</Link>
        </ul>
      </ul>
    </aside>
  );
};
