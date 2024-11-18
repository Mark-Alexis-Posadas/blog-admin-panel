import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

interface Post {
  title: string;
  image: string;
  content: string;
  categories: string;
}
interface Type {
  viewPost: Post | null;
  setIsToggleViewPost: (close: boolean) => void;
}

export const ViewPostModal: FC<Type> = ({ viewPost, setIsToggleViewPost }) => {
  if (!viewPost) {
    return null;
  }

  return (
    <div className="flex items-center justify-center fixed w-full top-0 left-0 min-h-screen bg-[rgba(0,0,0,0.4)]">
      <div className="bg-white dark:bg-gray-700 p-5 md:p-10 w-[900px]">
        <div className="flex items-center justify-between mb-5">
          <h1 className="font-bold text-xl">Post</h1>
          <button onClick={() => setIsToggleViewPost(false)}>
            <FontAwesomeIcon icon={faXmarkCircle} className="text-lg" />
          </button>
        </div>
        <ul>
          <img src={viewPost.image} alt="" />
          <li className="mb-3">
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
