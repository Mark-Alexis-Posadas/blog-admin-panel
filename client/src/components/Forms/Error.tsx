import { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}
export const Error: FC<Props> = ({ children }) => {
  return <p className="text-red-600 text-sm">{children}</p>;
};
