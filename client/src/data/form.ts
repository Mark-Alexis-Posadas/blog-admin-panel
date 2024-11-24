import { v4 as uuidv4 } from "uuid";
interface FormTypes {
  id: string;
  name: string;
}
export const formData: FormTypes[] = [
  { id: uuidv4(), name: "Title" },
  { id: uuidv4(), name: "Image" },
  { id: uuidv4(), name: "Content" },
];
