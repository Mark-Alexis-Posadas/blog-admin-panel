import { faCircleXmark, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

export const AddNewPost: FC = () => {
  return (
    <form className="bg-white dark:bg-gray-700 p-5 md:p-10 w-[900px]">
      <h1>Add new post</h1>
      <div className="mb-3">
        <label htmlFor="">Title</label>
        <input type="text" />
      </div>
      <div className="mb-3">
        <label htmlFor="">Title</label>
        <input type="text" />
      </div>
      <div className="mb-3">
        <label htmlFor="">Category</label>
        <select name="" id="">
          <option value="selectCategory">select category</option>
        </select>
      </div>
      <div className="flex items-center gap-3">
        <button className="text-white rounded p-2 bg-red-600 flex items-center gap-2">
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
  );
};
