import { FC } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faFolder,
  faHome,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
export const Sidebar: FC = () => {
  return (
    <aside className="border-r border-slate-300 p-5 h-screen overflow-hidden fixed top-0 w-[250px]">
      <ul className="max-w-[1100px] m-auto flex flex-col gap-3">
        <Link className="flex items-center gap-2" to="/">
          <FontAwesomeIcon icon={faHome} />
          Dashboard
        </Link>
        <Link className="flex items-center gap-2" to="/posts">
          <FontAwesomeIcon icon={faFile} /> Posts
        </Link>
        <Link className="flex items-center gap-2" to="/categories">
          <FontAwesomeIcon icon={faFolder} />
          Categories
        </Link>
        <Link className="flex items-center gap-2" to="/accounts">
          <FontAwesomeIcon icon={faUser} />
          Accounts
        </Link>
      </ul>
    </aside>
  );
};
