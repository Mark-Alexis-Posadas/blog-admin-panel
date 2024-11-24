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
import { Error } from "./Forms/Error";
import { Input } from "./Forms/Input";
import { TextArea } from "./Forms/TextArea";

const Schema = Yup.object({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("content is required"),
  image: Yup.string().required("image is required"),
});

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
    <div className="flex items-center justify-center fixed w-full top-0 left-0 min-h-screen bg-[rgba(0,0,0,0.4)]">
      <Formik
        initialValues={initialFormValues}
        validationSchema={Schema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            if (isEditing) {
              setIsTogglePosts(false);
              // const updatedPost = {
              //   title,
              //   image,
              //   content,
              //   categories: selectedCategories,
              // };
              await updatePost({ id: viewPostId, values });

              const updatedPosts = postUpdate.map((post) =>
                post.id === viewPostId ? { ...post, ...values } : post
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
      >
        {({ values, handleChange, handleBlur, isSubmitting, errors }) => (
          <form className="bg-white dark:bg-gray-700 p-5 md:p-10 w-[900px]">
            <h1 className="font-bold text-xl mb-5">
              {isEditing ? "Update Post" : "Add new post"}
            </h1>

            <ErrorMessage name="title" component={Error} />
            <Field
              label="Title"
              component={Input}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
              name="title"
              type="text"
              placeholder="title"
              className={`${
                errors.title ? "border-red-500" : "border-gray-300 "
              } block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
            />
            <ErrorMessage name="image" component={Error} />
            <Field
              label="Image"
              component={Input}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.image}
              name="image"
              type="text"
              placeholder="image url"
              className={`${
                errors.image ? "border-red-500" : "border-gray-300 "
              } block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
            />

            <ErrorMessage name="content" component={Error} />
            <Field
              label="Content"
              component={TextArea}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.content}
              name="content"
              className={`${
                errors.image ? "border-red-500" : "border-gray-300 "
              } block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
            />

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
                          checked={selectedCategories.includes(category.id)}
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
                disabled={isSubmitting}
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
    </div>
  );
};
