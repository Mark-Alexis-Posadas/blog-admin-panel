import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Posts {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
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
      query: (newPosts) => ({
        url: "create-pos",
        method: "POST",
        body: newPosts,
      }),
    }),

    updatePost: builder.mutation<
      Posts,
      { id: string; product: Partial<Posts> }
    >({
      query: ({ id, product }) => ({
        url: `/products/update-product/${id}`,
        method: "PUT",
        body: product,
      }),
    }),

    deletePost: builder.mutation<void, string>({
      query: (id) => ({
        url: `/products/delete-product/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useCreateNewPostMutation,
  useGetSinglePostQuery,
  useUpdatePostMutation,
} = apiSlice;
export default apiSlice;
