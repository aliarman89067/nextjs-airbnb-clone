"use client";
import React from "react";
import Image from "next/image";

interface AvatarProps {
  image?: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ image }) => {
  return (
    <div>
      <Image
        src={image || "/images/placeholder.jpg"}
        className="rounded-full"
        height={30}
        width={30}
        alt="Avatar"
      />
    </div>
  );
};
export default Avatar;
