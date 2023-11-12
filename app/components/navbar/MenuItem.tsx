"use client";
import React from "react";

interface UserMenuProp {
  onClick: () => void;
  label: string;
}

const MenuItem: React.FC<UserMenuProp> = ({ onClick, label }) => {
  return (
    <div
      onClick={onClick}
      className="px-4 py-3 hover:bg-neutral-200 transition-all font-normal"
    >
      {label}
    </div>
  );
};
export default MenuItem;
