import React from "react";
import NavbarItem from "./NavbarItem";

export default function Navbar() {
  return (
    <div
      className="flex dark:bg-gray-600 justify-center
    gap-6    bg-amber-100 p-4 lg:text-lg "
    >
      <NavbarItem title="Trending" param="fetchTrending" />
      <NavbarItem title="Top Rated" param="fetchTopRated" />
    </div>
  );
}
