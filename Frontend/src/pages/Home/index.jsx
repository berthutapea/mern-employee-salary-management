import React from "react";
import { Banner, Navbar } from "../../components";
import About from "../About";
import Contact from "../Contact";

const Home = () => {
    return (
        <>
            <div className="dark:bg-boxdark">
                <Navbar />
                <Banner />
                <About />
                <Contact />
            </div>
        </>
    );
};

export default Home;
