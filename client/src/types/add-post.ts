export interface AddNewPostTypes {
  isEditing: boolean;
  setIsTogglePosts: (close: boolean) => void;
  setIsEditing: (close: boolean) => void;
  values: { title: string; image: string; content: string };
  setValues: (values: {
    title: string;
    image: string;
    content: string;
  }) => void;
  initialFormValues: {
    title: string;
    image: string;
    content: string;
  };
  viewPostId: number | null;
  setViewPostId: (id: number | null) => void;
  updateFetchedPosts: (open: boolean) => void;
}
