import React from "react";

const Footer = () => {
    return (
        <div>
            <footer className="text-sm text-center px-10 py-6 text-base-100 border-base-300 bg-neutral ">
                <div className="w-full h-[2px] bg-gray-600"></div>
                <div className="flex flex-col md:flex-row items-center justify-center text-accent">
                    <p>&copy; Copyright 2023, PT. Humpus Karbometil Selulosa. All Rights Reserved</p>
                </div>
            </footer>
        </div>
    );
};

export default Footer;