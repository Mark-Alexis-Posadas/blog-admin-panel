import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
interface Type {
  setIsToggleViewPost: (close: boolean) => void;
}
export const ViewPostModal: FC<Type> = ({ setIsToggleViewPost }) => {
  return (
    <div className="flex items-center justify-center fixed w-full top-0 left-0 min-h-screen bg-[rgba(0,0,0,0.4)]">
      <div className="bg-white dark:bg-gray-700 p-5 md:p-10 w-[900px] flex items-center justify-between">
        <h1 className="font-bold text-xl mb-5">Post</h1>
        <button onClick={() => setIsToggleViewPost(false)}>
          <FontAwesomeIcon
            icon={faXmarkCircle}
            className="bg-red-600 text-lg"
          />
        </button>
      </div>
    </div>
  );
};
