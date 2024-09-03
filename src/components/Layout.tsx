import React from "react";
import "../styles/f1.css";
import F1Navbar from "./f1Navbar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <F1Navbar></F1Navbar>
      <div>{children}</div>
    </>
  );
};

export default Layout;
