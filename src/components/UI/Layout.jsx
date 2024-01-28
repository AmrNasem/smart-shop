import React from "react";
import Header from "../header/Header";
import Footer from "../Footer";

const Layout = ({ children, className, style }) => {
  return (
    <>
      <Header />
      <main className={className} style={style}>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
