import React from "react";
import "../styles/f1.css";
import F1Navbar from "./f1/f1Navbar";
import TopBar from "./topBar";
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <TopBar></TopBar>
      <F1Navbar></F1Navbar>
      <div>{children}</div>
    </>
  );
};

export default Layout;
