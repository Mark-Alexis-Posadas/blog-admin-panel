import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

import { PostTypes } from "../types/view-post";

export const ViewPostModal: FC<PostTypes> = ({
  viewPost,
  setIsToggleViewPost,
}) => {
  if (!viewPost) {
    return null;
  }

  return (
    <div className="flex items-center justify-center fixed w-full top-0 left-0 min-h-screen bg-[rgba(0,0,0,0.4)]">
      <div className="bg-white dark:bg-gray-700  p-5 rounded w-[700px]">
        <div className="flex items-center justify-between mb-5">
          <h1 className="font-bold text-xl">Post</h1>
          <button onClick={() => setIsToggleViewPost(false)}>
            <FontAwesomeIcon icon={faXmarkCircle} className="text-lg" />
          </button>
        </div>
        <ul>
          <img
            src={viewPost.image}
            alt={viewPost.image}
            className="rounded w-full h-[400px] object-contain"
          />
          <li className="mt-5 mb-3">
            <strong>Title:</strong> {viewPost.title}
          </li>
          <li className="mb-3">
            <strong>Content:</strong> {viewPost.content}
          </li>
          <li className="mb-3">
            <strong>Category:</strong> {viewPost.categories}
          </li>
        </ul>
      </div>
    </div>
  );
};
