export interface AddNewPostTypes {
  isEditing: boolean;
  setIsTogglePosts: (close: boolean) => void;
  setIsEditing: (close: boolean) => void;
  values: { title: string; image: string; content: string; categories: string };
  setValues: (values: {
    title: string;
    image: string;
    content: string;
    categories: string;
  }) => void;
  initialFormValues: {
    title: string;
    image: string;
    content: string;
    categories: string;
  };
  viewPostId: number | null;
  setViewPostId: (id: number | null) => void;
}
