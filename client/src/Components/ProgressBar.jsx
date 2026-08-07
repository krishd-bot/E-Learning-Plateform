import React from "react";

const ProgressBar = ({ progress = 0, showLabel = true }) => {
  return (
    <div className="w-full">
      <div className="w-full bg-base-300 rounded-full h-2.5 overflow-hidden">
        <div
          className="bg-primary h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-xs mt-1 opacity-70">{progress}% complete</p>
      )}
    </div>
  );
};

export default ProgressBar;
