import {
  faEye,
  faPencil,
  faPlus,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState, useEffect } from "react";
import { AddNewPost } from "../components/AddNewPost";
import {
  useDeletePostMutation,
  useGetPostsQuery,
  useGetSinglePostQuery,
} from "../features/apiSlice";
import { ViewPostModal } from "../components/ViewPostModal";
import { columns } from "../data/PostsHeader";
import { ConfirmationDelete } from "../components/ConfirmationDelete";

const initialFormValues = {
  title: "",
  image: "",
  content: "",
};

export const Posts: FC = () => {
  const [values, setValues] = useState(initialFormValues);
  const [isTogglePosts, setIsTogglePosts] = useState<boolean>(false);
  const [isToggleViewPost, setIsToggleViewPost] = useState<boolean>(false);
  const [isToggleDelete, setIsToggleDelete] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [viewPostId, setViewPostId] = useState<number | null>(null);

  const { data: posts = [], refetch } = useGetPostsQuery();
  const [fetchedPosts, setFetchedPosts] = useState(posts);
  const [deletePost] = useDeletePostMutation();

  const { data: post } = useGetSinglePostQuery(viewPostId || -1, {
    skip: !viewPostId,
  });

  useEffect(() => {
    setFetchedPosts(posts);
  }, [posts]);

  const handleViewPost = (id: number) => {
    setViewPostId(id);
    setIsToggleViewPost(true);
  };

  const handleToggleDeletePost = (id: number) => {
    setViewPostId(id);
    setIsToggleDelete(true);
  };

  const handleProceedDeletePost = async () => {
    if (viewPostId) {
      await deletePost(viewPostId.toString());
      refetch();
      setIsToggleDelete(false);
    }
  };

  const handleToggleUpdatePost = (id: number) => {
    const postToEdit = posts.find((post) => post.id === id);
    if (postToEdit) {
      setViewPostId(id);
      setIsTogglePosts(true);
      setIsEditing(true);
      setValues({
        title: postToEdit.title,
        image: postToEdit.image,
        content: postToEdit.content,
      });
    }
  };

  const updateFetchedPosts = (newPost: any, isEditing: boolean) => {
    if (isEditing) {
      // Update the existing post
      const updatedPosts = fetchedPosts.map((post) =>
        post.id === newPost.id ? { ...post, ...newPost } : post
      );
      setFetchedPosts(updatedPosts);
    } else {
      // Add the new post to the list
      setFetchedPosts((prevPosts) => [...prevPosts, newPost]);
    }
  };

  return (
    <section>
      <div className="flex items-center justify-between shadow-custom-shadow rounded p-4 w-[700px] m-auto">
        <button
          className="text-white rounded p-2 bg-indigo-600 flex items-center gap-2"
          onClick={() => setIsTogglePosts(!isTogglePosts)}
        >
          <FontAwesomeIcon icon={faPlus} />
          New post
        </button>
        <div className="relative flex items-center gap-2">
          <FontAwesomeIcon icon={faSearch} />
          <input type="text" placeholder="Search" className="outline-none" />
        </div>
        <div className="flex items-center gap-2">
          <select>
            <option value="default">Default</option>
          </select>
          <label htmlFor="">Filter</label>
        </div>
      </div>

      <div className="p-5 rounded shadow-custom-shadow mt-10">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columns.map((item) => (
                <th key={uuidv4()} scope="col" className="px-6 py-3">
                  {item.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fetchedPosts?.map((item) => (
              <tr
                key={item.id}
                className="border-b dark:border-gray-700 odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img
                    className="w-[100px] h-[50px] rounded object-cover"
                    src={item.image}
                  />
                </th>
                <td className="px-6 py-4">{item.title}</td>
                <td className="px-6 py-4">{item.content}</td>

                <td className="px-6 py-4">likes</td>
                <td className="px-6 py-4">comments</td>
                <td className="px-6 py-4">
                  <button
                    className="outline-none text-gray-600"
                    onClick={() => handleViewPost(item.id)}
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button
                    className="outline-none text-red-600"
                    onClick={() => handleToggleDeletePost(item.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button
                    className="outline-none text-blue-600"
                    onClick={() => handleToggleUpdatePost(item.id)}
                  >
                    <FontAwesomeIcon icon={faPencil} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isTogglePosts && (
        <AddNewPost
          values={values}
          setValues={setValues}
          initialFormValues={initialFormValues}
          viewPostId={viewPostId}
          setViewPostId={setViewPostId}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          setIsTogglePosts={setIsTogglePosts}
          updateFetchedPosts={updateFetchedPosts}
        />
      )}
      {isToggleViewPost && (
        <ViewPostModal
          viewPost={post || null}
          setIsToggleViewPost={setIsToggleViewPost}
        />
      )}

      {isToggleDelete && (
        <ConfirmationDelete
          setIsToggleDelete={setIsToggleDelete}
          handleProceedDeletePost={handleProceedDeletePost}
        />
      )}
    </section>
  );
};
