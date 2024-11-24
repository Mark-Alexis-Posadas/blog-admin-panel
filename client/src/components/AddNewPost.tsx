import { FC } from "react";
import { faCircleXmark, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCreateNewPostMutation } from "../features/apiSlice";
import { AddNewPostTypes } from "../types/add-post";
import { Input } from "./Forms/Input";
import { TextArea } from "./Forms/TextArea";
import { formData } from "../data/form";

export const AddNewPost: FC<AddNewPostTypes> = ({
  values,
  setValues,
  initialFormValues,
  setIsTogglePosts,
  isEditing,
}) => {
  const { title, image, content } = values;
  const [createNewPost] = useCreateNewPostMutation();

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleCancel = () => {
    setIsTogglePosts(false);
    setValues(initialFormValues);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isEditing) {
        setIsTogglePosts(false);
        const updatedPost = {
          title,
          image,
          content,
        };
        await updatePost({ id: viewPostId, updatedPost });

        const updatedPosts = postUpdate.map((post) =>
          post.id === viewPostId ? { ...post, ...values } : post
        );
        setPostUpdate(updatedPosts);
      } else {
        console.log(values);
        await createNewPost({
          title,
          image,
          content,
        }).unwrap();
        refetch();
        setIsTogglePosts(false);
        setValues(initialFormValues);
      }
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
        <h1 className="font-bold text-xl mb-5">Add Post</h1>

        {formData.map((item, index) =>
          index != 2 ? (
            <Input
              id={item.id}
              key={item.id}
              label={item.name}
              handleChange={handleChange}
              value={initialFormValues}
              name={item.name.toLowerCase()}
              type="text"
              placeHolder={item.name}
              className={` "border-gray-300 
             block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
            />
          ) : (
            <TextArea
              id={item.id}
              key={item.id}
              label={item.name}
              handleChange={handleChange}
              value={initialFormValues}
              name={item.name.toLowerCase()}
              className={` "border-gray-300 
           block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
            />
          )
        )}

        <div className="flex items-center gap-3">
          <button
            className="text-white rounded p-2 bg-red-600 flex items-center gap-2"
            onClick={handleCancel}
            type="button"
          >
            Cancel
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>

          <button
            type="submit"
            className="text-white rounded p-2 bg-blue-600 flex items-center gap-2"
          >
            Submit
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </form>
    </div>
  );
};
