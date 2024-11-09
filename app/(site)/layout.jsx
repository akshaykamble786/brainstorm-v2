import Footer from "@/components/global/Footer";
import Header from "@/components/global/Header";
import React from "react";

const HomePageLayout = ({ children }) => {
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  );
};

export default HomePageLayout;