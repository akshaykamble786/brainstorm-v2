import Footer from "@/components/global/Footer";
import Header from "@/components/global/Header";
import React from "react";

export default function PricingLayout({ children }) {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    )
}