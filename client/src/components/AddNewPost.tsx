import * as Yup from "yup";
import { Formik, Field, ErrorMessage } from "formik";
import { faCircleXmark, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import { blogCategories } from "../data/catagories";
import {
  useCreateNewPostMutation,
  useGetPostsQuery,
  useUpdatePostMutation,
} from "../features/apiSlice";
import { AddNewPostTypes } from "../types/add-post";

export const AddNewPost: FC<AddNewPostTypes> = ({
  values,
  setValues,
  initialFormValues,
  viewPostId,
  setViewPostId,
  setIsEditing,
  isEditing,
  setIsTogglePosts,
}) => {
  const { title, image, content, categories } = values;
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isToggleCategories, setIsToggleCategories] = useState<boolean>(false);
  const { data: fetchedPosts = [], refetch } = useGetPostsQuery();
  const [createNewPost] = useCreateNewPostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [postUpdate, setPostUpdate] = useState(fetchedPosts);

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleCategoriesChange = (categoryId: string) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(categoryId)) {
        return prevSelected.filter((id) => id !== categoryId);
      } else {
        return [...prevSelected, categoryId];
      }
    });
  };

  const handleCategoryDisplay = () => {
    const selectedCategoryNames = blogCategories
      .filter((category) => selectedCategories.includes(category.id))
      .map((category) => category.name);
    return selectedCategoryNames.length
      ? selectedCategoryNames.join(", ")
      : "Select categories";
  };

  const handleCancel = () => {
    setIsTogglePosts(false), setViewPostId(null), setIsEditing(false);
    setValues(initialFormValues);
  };

  return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={Schema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          if (isEditing) {
            setIsTogglePosts(false);
            const updatedPost = {
              title,
              image,
              content,
              categories: selectedCategories,
            };
            await updatePost({ id: viewPostId, updatedPost });

            const updatedPosts = postUpdate.map((post) =>
              post.id === viewPostId ? { ...post, ...updatedPost } : post
            );
            setPostUpdate(updatedPosts);
          } else {
            await createNewPost({
              title,
              image,
              content,
              categories: selectedCategories,
            }).unwrap();
            refetch();
            setIsTogglePosts(false);
            setValues(initialFormValues);
          }
        } catch (error) {
          console.log((error as Error).message);
        }
      }}
      className="flex items-center justify-center fixed w-full top-0 left-0 min-h-screen bg-[rgba(0,0,0,0.4)]"
    >
      {({ values, handleChange, handleBlur, isSubmitting, errors }) => (
        <form
          className="bg-white dark:bg-gray-700 p-5 md:p-10 w-[900px]"
          onSubmit={handleFormSubmit}
        >
          <h1 className="font-bold text-xl mb-5">
            {isEditing ? "Update Post" : "Add new post"}
          </h1>
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
            <div className="rellative">
              <div
                onClick={() => setIsToggleCategories(!isToggleCategories)}
                className="block h-[42px] py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              >
                {handleCategoryDisplay()}
              </div>
              {isToggleCategories && (
                <div className="absolute bg-white rounded p-3">
                  {blogCategories.map((category) => (
                    <div key={category.id} className="my-2">
                      <input
                        type="checkbox"
                        value={category.id}
                        checked={selectedCategories.includes(category.id)} // Check if the category is selected
                        onChange={() => handleCategoriesChange(category.id)}
                        name="categories"
                      />
                      <label>{category.name}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="text-white rounded p-2 bg-red-600 flex items-center gap-2"
              onClick={handleCancel}
            >
              Cancel
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
            <button
              className="text-white rounded p-2 bg-blue-600 flex items-center gap-2"
              type="submit"
            >
              {isEditing ? "Update" : "Submit"}
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};
