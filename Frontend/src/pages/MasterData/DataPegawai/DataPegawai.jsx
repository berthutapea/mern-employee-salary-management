import React from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import User1 from '../../../Assets/images/user/gilbert.png'
import User2 from '../../../Assets/images/user/user-02.png'
import User3 from '../../../Assets/images/user/user-01.png'
import User4 from '../../../Assets/images/user/user-04.png'
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import { FaRegEdit } from 'react-icons/fa'
import { BsTrash3 } from 'react-icons/bs'

const DataPegawai = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName='Data Pegawai' />

            <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1'>
                <div className='max-w-full overflow-x-auto'>
                    <table className='w-full table-auto'>
                        <thead>
                            <tr className='bg-gray-2 text-left dark:bg-meta-4'>
                                <th className='py-4 px-4 font-medium text-black dark:text-white xl:pl-11'>
                                    Photo
                                </th>
                                <th className='py-4 px-4 font-medium text-black dark:text-white xl:pl-11'>
                                    NIK
                                </th>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>
                                    Nama Pegawai
                                </th>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>
                                    Jenis Kelamin
                                </th>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>
                                    Tanggal Masuk
                                </th>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>
                                    Status
                                </th>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark'>
                                    <div className="h-12.5 w-15">
                                        <img className='rounded-full' src={User1} alt="Gilbert Hutapea" />
                                    </div>
                                </td>
                                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                    <p className='text-black dark:text-white'>1218052110020002</p>
                                </td>
                                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                    <p className='text-black dark:text-white'>Gilbert Hutapea</p>
                                </td>
                                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                    <p className='text-black dark:text-white'>Laki-Laki</p>
                                </td>
                                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                    <p className='text-black dark:text-white'>15-01-2023</p>
                                </td>
                                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                    <p className='text-black dark:text-white'>Karyawan Tetap</p>
                                </td>
                                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                    <div className='flex items-center space-x-3.5'>
                                        <button className='hover:text-black'>
                                            <FaRegEdit className="text-primary text-xl hover:text-black" />
                                        </button>
                                        <button className='hover:text-black'>
                                            <BsTrash3 className="text-danger text-xl hover:text-black" />
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td className='border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark'>
                                    <div className="h-12.5 w-15">
                                        <img className='rounded-full' src={User2} alt="Layla Siregar" />
                                    </div>
                                </td>
                                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                    <p className='text-black dark:text-white'>1218052110020003</p>
                                </td>
                                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                    <p className='text-black dark:text-white'>Layla Siregar</p>
                                </td>
                                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                    <p className='text-black dark:text-white'>Perempuan</p>
                                </td>
                                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                    <p className='text-black dark:text-white'>16-02-2023</p>
                                </td>
                                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                    <p className='text-black dark:text-white'>Karyawan Tidak Tetap</p>
                                </td>
                                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                    <div className='flex items-center space-x-3.5'>
                                        <button className='hover:text-black'>
                                            <FaRegEdit className="text-primary text-xl hover:text-black" />
                                        </button>
                                        <button className='hover:text-black'>
                                            <BsTrash3 className="text-danger text-xl hover:text-black" />
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td className='border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark'>
                                    <div className="h-12.5 w-15">
                                        <img className='rounded-full' src={User3} alt="Zilong Sibarani" />
                                    </div>
                                </td>
                                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                    <p className='text-black dark:text-white'>1218052110020004</p>
                                </td>
                                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                    <p className='text-black dark:text-white'>Zilong Sibarani</p>
                                </td>
                                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                    <p className='text-black dark:text-white'>Laki-Laki</p>
                                </td>
                                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                    <p className='text-black dark:text-white'>17-03-2023</p>
                                </td>
                                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                    <p className='text-black dark:text-white'>Karyawan Tetap</p>
                                </td>
                                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                    <div className='flex items-center space-x-3.5'>
                                        <button className='hover:text-black'>
                                            <FaRegEdit className="text-primary text-xl hover:text-black" />
                                        </button>
                                        <button className='hover:text-black'>
                                            <BsTrash3 className="text-danger text-xl hover:text-black" />
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td className='border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark'>
                                    <div className="h-12.5 w-15">
                                        <img className='rounded-full' src={User4} alt="Nana Silaban" />
                                    </div>
                                </td>
                                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                    <p className='text-black dark:text-white'>1218052110020005</p>
                                </td>
                                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                    <p className='text-black dark:text-white'>Nana Silaban</p>
                                </td>
                                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                    <p className='text-black dark:text-white'>Perempuan</p>
                                </td>
                                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                    <p className='text-black dark:text-white'>18-04-2023</p>
                                </td>
                                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                    <p className='text-black dark:text-white'>Karyawan Tidak Tetap</p>
                                </td>
                                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                    <div className='flex items-center space-x-3.5'>
                                        <button className='hover:text-black'>
                                            <FaRegEdit className="text-primary text-xl hover:text-black" />
                                        </button>
                                        <button className='hover:text-black'>
                                            <BsTrash3 className="text-danger text-xl hover:text-black" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default DataPegawai;
