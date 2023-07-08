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
import LogoSipeka from '../../../assets/images/logo/logo-sipeka.png'
import { ButtonThree, DarkModeSwitcher } from "../../atoms";

export default function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false);
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };

    const navLinks = [
        { title: "Beranda", link: "/", icon: <FaHome /> },
        { title: "Tentang", link: "/tentang", icon: <RiFolderInfoFill /> },
        { title: "Kontak", link: "/kontak", icon: <RiContactsBook2Fill /> },
    ];

    const activeLink = ({ isActive }) => {
        return {
            fontWeight: 500,
            color: isActive && "#5345f5",
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
            className='visible  bg-white dark:bg-black z-50'>
            <div className="w-full flex items-center justify-between px-3 md:px-24 py-3">
                <div>
                    <Link to="/">
                        <img
                            src={LogoSipeka}
                            alt="Logo SiPeKa"
                            className="w-40"
                            title="Logo SiPeKa"
                        />
                    </Link>
                </div>
                <div>
                    <ul className="lg:flex items-center hidden ">
                        {navLinks.map((navItem) => (
                            <li className="mx-4" key={navItem.title}>
                                <NavLink
                                    to={navItem.link}
                                    style={activeLink}
                                    className="dark:text-white hover:text-accent duration-300 dark:hover:text-primary text-boxdark"
                                >
                                    {navItem.title}
                                </NavLink>
                            </li>
                        ))}
                        <DarkModeSwitcher />
                        <Link
                            className="mx-4"
                            to={'/login'}
                        >
                            <ButtonThree>
                                <span>Login</span>
                            </ButtonThree>
                        </Link>
                    </ul>
                    <div className="block lg:hidden ">
                        <button onClick={toggleDrawer} className="btn btn-ghost text-black dark:text-white dark:hover:text-primary hover:text-primary ">
                            <RiMenu3Fill></RiMenu3Fill>
                        </button>
                        <Drawer
                            open={isOpen}
                            onClose={toggleDrawer}
                            direction="right"
                            className="bla bla bla flex flex-col justify-between pb-4 dark:bg-boxdark"
                        >
                            <ul className="dark:bg-boxdark">
                                <li className="mt-6 mb-10 ml-4 ">
                                    <GiCrossMark
                                        className="cursor-pointer hover:text-primary text-boxdark duration-300 dark:text-white dark:hover:text-primary"
                                        onClick={() => setIsOpen(!isOpen)}
                                    ></GiCrossMark>
                                </li>
                                {navLinks.map((navItem) => (
                                    <li
                                        className="m-4 "
                                        key={navItem.title}
                                        onClick={() => setIsOpen(!isOpen)}
                                    >
                                        <NavLink
                                            to={navItem.link}
                                            style={activeLink}
                                            className="flex items-center text-boxdark hover:text-primary duration-300 dark:text-white dark:hover:text-primary"
                                        >
                                            <span className="mr-3">{navItem.icon}</span>
                                            <span>{navItem.title}</span>
                                        </NavLink>
                                    </li>
                                ))}
                                <div className=' my-4 mr-3 m-4' >
                                    <DarkModeSwitcher />
                                </div>
                                <Link
                                    className="flex items-center my-4 mr-6 m-6"
                                    to={'/login'}
                                >
                                    <ButtonThree
                                        className="primary-button w-full text-white">
                                        <span>Login</span>
                                    </ButtonThree>
                                </Link>
                            </ul>
                            <div className="text-center dark:bg-boxdark">
                                <p className="text-accent dark:text-white">
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
