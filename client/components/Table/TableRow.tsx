import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faEye,
  faHeart,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { TableRowTypes } from "../../types/table";

export const TableRow: FC<TableRowTypes> = ({
  item,
  handleViewPost,
  handleToggleDeletePost,
  handleToggleUpdatePost,
}) => {
  return (
    <tr className="border-b dark:border-gray-700 odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <img
          className="w-[100px] h-[50px] rounded object-cover"
          src={item.image}
        />
      </th>
      <td className="px-6 py-4">{item.title}</td>
      <td className="px-6 py-4">{item.content}</td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faHeart} />
          <span>likes</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faComments} />
          <span>comments</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <button
          className="outline-none text-gray-600"
          onClick={() => handleViewPost(item.id)}
        >
          <FontAwesomeIcon icon={faEye} />
        </button>
      </td>
      <td className="px-6 py-4">
        <button
          className="outline-none text-red-600"
          onClick={() => handleToggleDeletePost(item.id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
      <td className="px-6 py-4">
        <button
          className="outline-none text-blue-600"
          onClick={() => handleToggleUpdatePost(item.id)}
        >
          <FontAwesomeIcon icon={faPencil} />
        </button>
      </td>
    </tr>
  );
};
