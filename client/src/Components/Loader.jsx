import React from "react";

const Loader = ({ fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-base-100/80">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center py-16">
      <span className="loading loading-spinner loading-lg text-primary" />
    </div>
  );
};

export default Loader;
