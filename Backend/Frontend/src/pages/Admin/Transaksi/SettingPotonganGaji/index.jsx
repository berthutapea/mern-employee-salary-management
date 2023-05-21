import { useState, useEffect } from 'react';
import DefaultLayoutAdmin from '../../../../layout/DefaultLayoutAdmin';
import DataSettingPotonganGaji from '../../../../utils/DataSettingPotonganGaji';
import { Link } from "react-router-dom";
import { BreadcrumbAdmin, ButtonOne } from '../../../../components';
import { FaRegEdit, FaPlus } from 'react-icons/fa'
import { BsTrash3 } from 'react-icons/bs'
import { BiSearch } from 'react-icons/bi'

const ITEMS_PER_PAGE = 4;

const SettingPotonganGaji = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(ITEMS_PER_PAGE);
    const [settingPotonganGaji, setSettingPotonganGaji] = useState([]);

    const totalPages = Math.ceil(DataSettingPotonganGaji.length / ITEMS_PER_PAGE);

    useEffect(() => {
        setSettingPotonganGaji(DataSettingPotonganGaji.slice(startIndex, endIndex));
    }, [startIndex, endIndex]);

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
            setStartIndex((prev) => prev - ITEMS_PER_PAGE);
            setEndIndex((prev) => prev - ITEMS_PER_PAGE);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
            setStartIndex((prev) => prev + ITEMS_PER_PAGE);
            setEndIndex((prev) => prev + ITEMS_PER_PAGE);
        }
    };


    return (
        <DefaultLayoutAdmin>
            <BreadcrumbAdmin pageName='Setting Potongan Gaji' />
            <Link to="/admin/transaksi/setting-potongan-gaji/form-setting-potongan-gaji" >
                <ButtonOne  >
                    <span>Tambah Potongan</span>
                    <span>
                        <FaPlus />
                    </span>
                </ButtonOne>
            </Link>
            <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 mt-6'>
                <div className="flex justify-between items-center mt-4 flex-col md:flex-row md:justify-between">
                    <div className="relative flex-2 mb-4 md:mb-0">
                        <input
                            type='text'
                            placeholder='Type to search..'
                            className='rounded-lg border-[1.5px] border-stroke bg-transparent py-2 pl-10 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary left-0'
                        />
                        <span className='absolute left-2 py-3 text-xl'>
                            <BiSearch />
                        </span>
                    </div>
                </div>

                <div className='max-w-full overflow-x-auto py-4'>
                    <table className='w-full table-auto'>
                        <thead>
                            <tr className='bg-gray-2 text-left dark:bg-meta-4'>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>
                                    Potongan Gaji
                                </th>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>
                                    Jumlah Potongan
                                </th>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {settingPotonganGaji.map((settingPotonganGaji) => {
                                return (
                                    <tr key={settingPotonganGaji.id}>
                                        <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                            <p className='text-black dark:text-white'>{settingPotonganGaji.potonganGaji}</p>
                                        </td>
                                        <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                            <p className='text-black dark:text-white'>{settingPotonganGaji.jumlahPotongan}</p>
                                        </td>
                                        <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                            <div className='flex items-center space-x-3.5'>
                                                <button className='hover:text-black'>
                                                    <FaRegEdit className="text-primary text-xl hover:text-black dark:hover:text-white" />
                                                </button>
                                                <button className='hover:text-black'>
                                                    <BsTrash3 className="text-danger text-xl hover:text-black dark:hover:text-white" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className='flex justify-between items-center mt-4 flex-col md:flex-row md:justify-between'>
                    <div className='flex items-center space-x-2'>
                        <span className='text-gray-5 dark:text-gray-4 text-sm py-4'>
                            Showing {startIndex}-{endIndex} of {DataSettingPotonganGaji.length} Setting Potongan Gaji
                        </span>
                    </div>
                    <div className='flex space-x-2 py-4'>
                        <button
                            disabled={currentPage === 1}
                            onClick={goToPrevPage}
                            className='py-2 px-6 rounded-lg border border-primary text-primary font-semibold hover:bg-primary hover:text-white dark:text-white dark:border-primary dark:hover:bg-primary dark:hover:text-white disabled:opacity-50'
                        >
                            Prev
                        </button>
                        {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                            const page = i + 1;
                            if (page === currentPage) {
                                return (
                                    <div
                                        key={i}
                                        className="py-2 px-4 rounded-lg border border-primary bg-primary text-white font-semibold hover:bg-primary dark:text-white dark:bg-primary dark:hover:bg-primary"
                                    >
                                        {page}
                                    </div>
                                );
                            } else if (page === 2 && currentPage > 4) {
                                return (
                                    <p
                                        key={i}
                                        className="py-2 px-4 border border-gray-2 dark:bg-transparent text-black font-medium bg-gray dark:border-strokedark dark:text-white"
                                    >
                                        ...
                                    </p>
                                );
                            } else if (page === totalPages - 1 && currentPage < totalPages - 3) {
                                return (
                                    <p
                                        key={i}
                                        className="py-2 px-4 border border-gray-2 dark:bg-transparent text-black font-medium bg-gray dark:border-strokedark dark:text-white"
                                    >
                                        ...
                                    </p>
                                );
                            } else if (
                                page === 1 ||
                                page === totalPages ||
                                (page >= currentPage - 1 && page <= currentPage + 1)
                            ) {
                                return (
                                    <div
                                        key={i}
                                        className="py-2 px-4 rounded-lg border border-gray-2 text-black dark:bg-transparent bg-gray font-medium dark:border-strokedark dark:text-white"
                                    >
                                        {page}
                                    </div>
                                );
                            } else {
                                return null;
                            }
                        })}

                        <button
                            disabled={currentPage === totalPages}
                            onClick={goToNextPage}
                            className='py-2 px-6 rounded-lg border border-primary text-primary font-semibold hover:bg-primary hover:text-white dark:text-white dark:border-primary dark:hover:bg-primary dark:hover:text-white disabled:opacity-50'
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </DefaultLayoutAdmin>
    )
}

export default SettingPotonganGaji;