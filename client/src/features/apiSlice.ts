import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Posts {
  id: number;
  image: string;
  title: string;
  content: string;
  categories: string;
}

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/posts" }),
  endpoints: (builder) => ({
    getPosts: builder.query<Posts[], void>({
      query: () => "/get-all-posts",
    }),

    getSinglePost: builder.query<Posts, number>({
      query: (id) => `/get-single-post/${id}`,
    }),

    createNewPost: builder.mutation<Posts, Partial<Posts>>({
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

    updatePost: builder.mutation<Posts, { id: number; post: Partial<Posts> }>({
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
