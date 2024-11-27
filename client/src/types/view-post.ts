interface Post {
  title: string;
  image: string;
  content: string;
  categories: string;
}

export interface PostTypes {
  viewPost: Post | null;
  setIsToggleViewPost: (close: boolean) => void;
}
