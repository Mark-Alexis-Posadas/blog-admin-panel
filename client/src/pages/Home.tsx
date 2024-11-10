import { FC } from "react";
import { Link } from "react-router-dom";

export const Home: FC = () => {
  return (
    <section className="custom-min-h flex items-center justify-center">
      <div className="mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-800">
          Welcome to Our Blog
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Explore the latest articles, tips, and stories. Our blog is dedicated
          to providing you with insightful content on topics you care about.
        </p>
        <Link to="/blog">
          <button className="mt-6 inline-block px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Visit the Blog
          </button>
        </Link>
      </div>
    </section>
  );
};
