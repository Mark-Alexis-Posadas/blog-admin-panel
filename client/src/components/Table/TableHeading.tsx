import { FC } from "react";
import { TableHeadingType } from "../../types/table";

export const TableHeading: FC<TableHeadingType> = ({ item }) => {
  return (
    <th scope="col" className="px-6 py-3">
      {item.label}
    </th>
  );
};
