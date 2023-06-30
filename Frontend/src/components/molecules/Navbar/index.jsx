import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import {
    RiMenu3Fill,
    RiContactsBook2Fill,
    RiFolderInfoFill,
} from "react-icons/ri";
import { GiCrossMark } from "react-icons/gi";
import { FaHome } from "react-icons/fa";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { ButtonThree } from "../../atoms";

export default function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false);
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };

    const navLinks = [
        { title: "Beranda", link: "/", icon: <FaHome /> },
        { title: "Tentang", link: "/tentang", icon: <RiFolderInfoFill /> },
        { title: "Kontak", link: "/login", icon: <RiContactsBook2Fill /> },
    ];
    const activeLink = ({ isActive }) => {
        return {
            fontWeight: 500,
            color: isActive && "#6b7280",
        };
    };

    const [show, setShow] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    useEffect(() => {
        const controlNavbar = () => {
            if (typeof window !== "undefined") {
                if (window.scrollY > lastScrollY) {
                    setShow(true);
                } else {
                    setShow(false);
                }
                setLastScrollY(window.scrollY);
            }
        };
        if (typeof window !== "undefined") {
            window.addEventListener("scroll", controlNavbar);
            return () => {
                window.removeEventListener("scroll", controlNavbar);
            };
        }
    }, [lastScrollY]);

    return (
        <div
            className={`visible ${show && "nav-hidden"} shadow-lg bg-white 
       z-50`}
        >
            <div className="w-full flex items-center justify-between px-3 md:px-24 py-3">
                <div>
                    <Link to="/">
                        <h1 className="text-2xl text-primary font-lobster">SiPeKa</h1>
                    </Link>
                </div>
                <div>
                    <ul className="lg:flex items-center hidden">
                        {navLinks.map((navItem) => (
                            <li className="mx-4" key={navItem.title}>
                                <NavLink
                                    to={navItem.link}
                                    style={activeLink}
                                    className="text-primary hover:text-accent duration-300"
                                >
                                    {navItem.title}
                                </NavLink>
                            </li>
                        ))}
                        <Link
                            to={'/login'}
                        >
                            <ButtonThree>
                                <span>Login</span>
                            </ButtonThree>
                        </Link>
                    </ul>
                    <div className="block lg:hidden">
                        <button onClick={toggleDrawer} className="btn btn-ghost text-black">
                            <RiMenu3Fill></RiMenu3Fill>
                        </button>
                        <Drawer
                            open={isOpen}
                            onClose={toggleDrawer}
                            direction="right"
                            className="bla bla bla flex flex-col justify-between pb-4"
                        >
                            <ul className="">
                                <li className="mt-6 mb-10 ml-4">
                                    <GiCrossMark
                                        className="cursor-pointer hover:text-accent text-primary duration-300"
                                        onClick={() => setIsOpen(!isOpen)}
                                    ></GiCrossMark>
                                </li>
                                {navLinks.map((navItem) => (
                                    <li
                                        className="m-4"
                                        key={navItem.title}
                                        onClick={() => setIsOpen(!isOpen)}
                                    >
                                        <NavLink
                                            to={navItem.link}
                                            style={activeLink}
                                            className="flex items-center text-white hover:text-primary duration-300"
                                        >
                                            <span className="mr-3">{navItem.icon}</span>
                                            <span>{navItem.title}</span>
                                        </NavLink>
                                    </li>
                                ))}

                                <Link
                                    to={'/login'}
                                >
                                    <ButtonThree
                                        className="primary-button w-full text-white">
                                        <span>Login</span>
                                    </ButtonThree>
                                </Link>
                            </ul>
                            <div className="text-center">
                                <p className="text-accent">
                                    &copy; Copyright 2023, PT. Humpus Karbometil Selulosa. All Rights Reserved
                                </p>
                            </div>
                        </Drawer>
                    </div>
                </div>
            </div>
        </div >
    );
}
