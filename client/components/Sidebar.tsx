import { FC } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faFolder,
  faHome,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
export const Sidebar: FC = () => {
  return (
    <aside className="border-r border-slate-300 p-5 h-screen overflow-hidden fixed top-0 w-[250px]">
      <ul className="max-w-[1100px] m-auto flex flex-col gap-3">
        <Link className="flex items-center gap-2" href="/">
          <FontAwesomeIcon icon={faHome} />
          Dashboard
        </Link>
        <Link className="flex items-center gap-2" href="/posts">
          <FontAwesomeIcon icon={faFile} /> Posts
        </Link>
        <Link className="flex items-center gap-2" href="/categories">
          <FontAwesomeIcon icon={faFolder} />
          Categories
        </Link>
        <Link className="flex items-center gap-2" href="/accounts">
          <FontAwesomeIcon icon={faUser} />
          Accounts
        </Link>
      </ul>
    </aside>
  );
};
