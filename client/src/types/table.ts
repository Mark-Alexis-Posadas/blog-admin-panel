export interface TableHeadingType {
  item: { label: string };
}

export interface TableRowTypes {
  item: { id: number; image: string; title: string; content: string };
  handleViewPost: (id: number) => void;
  handleToggleDeletePost: (id: number) => void;
  handleToggleUpdatePost: (id: number) => void;
}
