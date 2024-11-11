import { FC } from "react";

export const Accounts: FC = () => {
  return (
    <div>
      {" "}
      <table className="mt-10 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              image
            </th>
            <th scope="col" className="px-6 py-3">
              title
            </th>
            <th scope="col" className="px-6 py-3">
              category
            </th>
            <th scope="col" className="px-6 py-3">
              likes
            </th>

            <th scope="col" className="px-6 py-3">
              view
            </th>
            <th scope="col" className="px-6 py-3">
              delete
            </th>
            <th scope="col" className="px-6 py-3">
              update
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b dark:border-gray-700 odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              image
            </th>
            <td className="px-6 py-4">title</td>
            <td className="px-6 py-4">category</td>
            <td className="px-6 py-4">likes</td>

            <td className="px-6 py-4">view</td>
            <td className="px-6 py-4">delete</td>
            <td className="px-6 py-4">update</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
