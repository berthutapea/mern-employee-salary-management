import React from 'react';
import Logo from '../../../assets/images/logo/logo.svg'
import LogoDark from '../../../assets/images/logo/logo-dark.svg'
import LoginImg from '../../../assets/images/LoginImg/login.svg'
import { FiUser } from 'react-icons/fi'
import { TfiLock } from 'react-icons/tfi'
import { Link } from 'react-router-dom'

const LoginAdmin = () => {
    return (
        <div className=' min-h-screen rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark '>
            <div className='flex flex-wrap items-center min-h-screen '>
                <div className='hidden w-full xl:block xl:w-1/2 '>
                    <div className='py-18.5 px-26 text-center'>
                        <span className="'mb-5.5 inline-block ">
                            <img className='hidden dark:block' src={Logo} alt='Logo PT. Humpus Karbometil Selulosa' />
                            <img className='dark:hidden' src={LogoDark} alt='Logo PT. Humpus Karbometil Selulosa' />
                        </span>
                        <p className='2xl:px-20'>
                            Login in to continue your activity!
                        </p>
                        <img className="mt-15 inline-block " src={LoginImg} alt='Logo' />
                    </div>
                </div>

                <div className='w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2'>
                    <div className='w-full p-4 sm:p-12.5 xl:p-17.5'>
                        <h2 className='mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2'>
                            Login to Admin
                        </h2>

                        <form>
                            <div className='mb-4'>
                                <label className='mb-2.5 block font-medium text-black dark:text-white'>
                                    Username
                                </label>
                                <div className='relative'>
                                    <input
                                        type='username'
                                        placeholder='Enter your username'
                                        className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                    />
                                    <FiUser className="absolute right-4 top-4 text-xl" />
                                </div>
                            </div>

                            <div className='mb-6'>
                                <label className='mb-2.5 block font-medium text-black dark:text-white'>
                                    Password
                                </label>
                                <div className='relative'>
                                    <input
                                        type='password'
                                        placeholder='Enter your password'
                                        className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                    />
                                    <TfiLock className="absolute right-4 top-4 text-xl" />
                                </div>
                            </div>

                            <div className='mb-5'>
                                <Link to='/admin/dashboard'>
                                    <input
                                        type='submit'
                                        value='Login'
                                        className='w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90'
                                    />
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginAdmin;
