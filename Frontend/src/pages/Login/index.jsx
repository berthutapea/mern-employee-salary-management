import React from 'react';
import Logo from '../../assets/images/logo/logo.svg';
import LogoDark from '../../assets/images/logo/logo-dark.svg';
import LoginImg from '../../assets/images/LoginImg/login.svg';
import { LoginInput } from '../../components';

function Login() {
    return (
        <div className="min-h-screen rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex flex-wrap items-center min-h-screen">
                <div className="hidden w-full xl:block xl:w-1/2">
                    <div className="py-18.5 px-26 text-center">
                        <span className="mb-5.5 inline-block">
                            <img
                                className="hidden dark:block"
                                src={Logo}
                                alt="Logo PT. Humpus Karbometil Selulosa"
                            />
                            <img
                                className="dark:hidden"
                                src={LogoDark}
                                alt="Logo PT. Humpus Karbometil Selulosa"
                            />
                        </span>
                        <p className="2xl:px-20">Login to continue your activity!</p>
                        <img className="mt-15 inline-block" src={LoginImg} alt="Logo" />
                    </div>
                </div>

                <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
                    <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                        <h3 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                            Employee Payroll
                        </h3>
                        <LoginInput />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
