import React from "react";
import { Link } from "react-router-dom";

import notFoundImg from "../assets/not-found.png";

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <img src={notFoundImg} alt="Not found" className="w-64 mb-6" />
      <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
      <p className="opacity-70 mb-6">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
