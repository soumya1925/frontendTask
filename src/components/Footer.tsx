import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-800 text-gray-300 text-center py-4 mt-10">
      <p className="text-sm">
        © {new Date().getFullYear()} Task Management App — All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
