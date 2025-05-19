"use client";
import {
  faComments,
  faEye,
  faHeart,
  faPencil,
  faPlus,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState, useEffect } from "react";
import { AddNewPost } from "@/components/AddNewPost";

import { ViewPostModal } from "@/components/ViewPostModal";
import { columns } from "@/data/PostsHeader";

import { ConfirmationDelete } from "@/components/ConfirmationDelete";
import { TableHeading } from "@/components/Table/TableHeading";
import { TableRow } from "@/components/Table/TableRow";

const initialFormValues = {
  title: "",
  image: "",
  content: "",
};

export const Posts: FC = () => {
  const [viewPostId, setViewPostId] = useState<number | null>(null);

  const [values, setValues] = useState(initialFormValues);
  const [isTogglePosts, setIsTogglePosts] = useState<boolean>(false);
  const [isToggleViewPost, setIsToggleViewPost] = useState<boolean>(false);
  const [isToggleDelete, setIsToggleDelete] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [fetchedPosts, setFetchedPosts] = useState(posts);

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
                <TableHeading key={uuidv4()} item={item} />
              ))}
            </tr>
          </thead>
          <tbody>
            {fetchedPosts?.map((item) => (
              <TableRow
                key={uuidv4()}
                item={item}
                handleViewPost={handleViewPost}
                handleToggleDeletePost={handleToggleDeletePost}
                handleToggleUpdatePost={handleToggleUpdatePost}
              />
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
