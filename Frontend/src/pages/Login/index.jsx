import React from 'react';
import LogoSipeka from '../../assets/images/logo/logo-sipeka.png';
import LoginImg from '../../assets/images/LoginImg/login.svg';
import { Footer, LoginInput, Navbar } from '../../components';

function Login() {
    return (
        <div className="pt-10 min-h-screen rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
            <Navbar />
            <div className="flex flex-wrap items-center min-h-screen">
                <div className="hidden w-full xl:block xl:w-1/2">
                    <div className="py-18.5 px-26 text-center ">
                        <span className="mb-5.5 inline-block ">
                            <img
                                className="w-80"
                                src={LogoSipeka}
                                alt='Logo SiPeKa'
                                title='Logo SiPeKa'
                            />
                        </span>
                        <p className="2xl:px-20 text-black dark:text-white">Sistem Penggajian Karyawan Online
                            <br /> PT. Humpuss Karbometil Selulosa</p>
                        <img className="mt-15 inline-block" src={LoginImg} alt="Logo" />
                    </div>
                </div>

                <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
                    <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                        <LoginInput />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
