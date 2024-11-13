import { faCircleXmark, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import { blogCategories } from "../data/catagories";
import { useCreateNewPostMutation } from "../features/apiSlice";

interface Types {
  setIsTogglePosts: (close: boolean) => void;
}

const initialFormValues = {
  title: "",
  image: "",
  content: "",
  categories: "",
};
export const AddNewPost: FC<Types> = ({ setIsTogglePosts }) => {
  const [values, setValues] = useState(initialFormValues);
  const { title, image, content, categories } = initialFormValues;
  const [createNewPost] = useCreateNewPostMutation();
  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsTogglePosts(false);
      setValues(initialFormValues);
      await createNewPost({ title, image, content, categories });
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return (
    <div className="flex items-center justify-center fixed w-full top-0 left-0 min-h-screen bg-[rgba(0,0,0,0.4)]">
      <form
        className="bg-white dark:bg-gray-700 p-5 md:p-10 w-[900px]"
        onSubmit={handleFormSubmit}
      >
        <h1 className="font-bold text-xl mb-5">Add new post</h1>
        <div className="mb-3">
          <label>Title</label>
          <input
            onChange={handleFormChange}
            value={values.title}
            name="title"
            type="text"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
        </div>
        <div className="mb-3">
          <label>Image</label>
          <input
            onChange={handleFormChange}
            value={values.image}
            name="image"
            type="text"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
        </div>

        <div className="mb-3">
          <label>Content</label>
          <textarea
            onChange={handleFormChange}
            value={values.content}
            name="content"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent  border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          ></textarea>
        </div>
        <div className="mb-3">
          <label>categories</label>
          <select
            onChange={handleFormChange}
            value={values.categories}
            name="categories"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          >
            <option value="">Select a categories</option>
            {blogCategories.map((categories) => (
              <option key={categories.id} value={categories.name}>
                {categories.name}
              </option>
            ))}
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
