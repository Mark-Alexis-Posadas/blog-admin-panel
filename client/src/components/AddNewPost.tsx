import { faCircleXmark, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

interface Types {
  setIsTogglePosts: (close: boolean) => void;
}

export const AddNewPost: FC<Types> = ({ setIsTogglePosts }) => {
  return (
    <div className="flex items-center justify-center fixed w-full top-0 left-0 min-h-screen bg-[rgba(0,0,0,0.4)]">
      <form className="bg-white dark:bg-gray-700 p-5 md:p-10 w-[900px]">
        <h1 className="font-bold text-xl mb-5">Add new post</h1>
        <div className="mb-3">
          <label htmlFor="">Title</label>
          <input
            type="text"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="">Picture</label>
          <input
            type="text"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="">Content</label>
          <textarea className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="">Category</label>
          <select className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
            <option value="selectCategory">select category</option>
          </select>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="text-white rounded p-2 bg-red-600 flex items-center gap-2"
            onClick={() => setIsTogglePosts(false)}
          >
            cancel
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
          <button
            className="text-white rounded p-2 bg-blue-600 flex items-center gap-2"
            type="submit"
          >
            submit
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </form>
    </div>
  );
};
