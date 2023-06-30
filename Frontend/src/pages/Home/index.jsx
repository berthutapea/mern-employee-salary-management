import React from "react";
import { Banner, Footer, Navbar } from "../../components";
import About from "../About";
import Contact from "../Contact";


const Home = () => {
    return (
        <>
            <Navbar />
            <Banner />
            <About />
            <Contact />
            <Footer />
        </>
    );
};

export default Home;
