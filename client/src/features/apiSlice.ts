import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PostsTypes } from "../types/api";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/posts" }),
  endpoints: (builder) => ({
    getPosts: builder.query<PostsTypes[], void>({
      query: () => "/get-all-posts",
    }),

    getSinglePost: builder.query<PostsTypes, number>({
      query: (id) => `/get-single-post/${id}`,
    }),

    createNewPost: builder.mutation<PostsTypes, Partial<PostsTypes>>({
      query: (newPost) => ({
        url: "/create-post",
        method: "POST",
        body: newPost,
      }),
    }),

    deletePost: builder.mutation<void, string>({
      query: (id) => ({
        url: `/delete-post/${id}`,
        method: "DELETE",
      }),
    }),

    updatePost: builder.mutation<
      PostsTypes,
      { id: number; post: Partial<PostsTypes> }
    >({
      query: ({ id, post }) => ({
        url: `/update-post/${id}`,
        method: "PUT",
        body: post,
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useCreateNewPostMutation,
  useGetSinglePostQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
} = apiSlice;
export default apiSlice;
