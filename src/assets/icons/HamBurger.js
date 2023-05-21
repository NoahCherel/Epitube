import React from "react";

const HamBurger = ({ onClick }) => {
  return (
    <button
      className="flex items-center justify-center"
      onClick={onClick}
      aria-label="Toggle Sidebar"
    >
      <svg className="fill-current text-white h-6 w-6" viewBox="0 0 100 80">
        <rect width="100" height="15" rx="8"></rect>
        <rect y="30" width="100" height="15" rx="8"></rect>
        <rect y="60" width="100" height="15" rx="8"></rect>
      </svg>
    </button>
  );
};

export default HamBurger;
