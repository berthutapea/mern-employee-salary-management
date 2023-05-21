import { useState, useEffect } from 'react';
import DefaultLayoutPegawai from '../../../layout/DefaultLayoutPegawai';
import DataGajiPegawaiPeople from '../../../utils/DataGajiPegawaiPeople';
import { BreadcrumbPegawai } from '../../../components';
import { TfiPrinter } from 'react-icons/tfi'

const ITEMS_PER_PAGE = 4;

const DataGajiPegawai = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(ITEMS_PER_PAGE);
    const [dataGajiPegawai, setDataGajiPegawai] = useState([]);

    const totalPages = Math.ceil(DataGajiPegawaiPeople.length / ITEMS_PER_PAGE);

    useEffect(() => {
        setDataGajiPegawai(DataGajiPegawaiPeople.slice(startIndex, endIndex));
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
        <DefaultLayoutPegawai>
            <BreadcrumbPegawai pageName='Data Gaji' />

            <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 mt-6'>
                <div className='max-w-full overflow-x-auto py-4'>
                    <table className='w-full table-auto'>
                        <thead>
                            <tr className='bg-gray-2 text-left dark:bg-meta-4'>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>
                                    Bulan/Tahun
                                </th>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>
                                    Gaji Pokok
                                </th>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>
                                    Tunjangan Transportasi
                                </th>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>
                                    Uang Makan
                                </th>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>
                                    Potongan
                                </th>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>
                                    Total Gaji
                                </th>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>
                                    Cetak Slip
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataGajiPegawai.map((dataGajiPegawai) => {
                                return (
                                    <tr key={dataGajiPegawai.id}>
                                        <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                            <p className='text-black dark:text-white'>{dataGajiPegawai.bulanTahun}</p>
                                        </td>
                                        <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                            <p className='text-black dark:text-white'>{dataGajiPegawai.gajiPokok}</p>
                                        </td>
                                        <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                            <p className='text-black dark:text-white'>{dataGajiPegawai.tunjanganTransport}</p>
                                        </td>
                                        <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                            <p className='text-black dark:text-white'>{dataGajiPegawai.uangMakan}</p>
                                        </td>
                                        <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                            <p className='text-black dark:text-white'>{dataGajiPegawai.jumlahPotongan}</p>
                                        </td>
                                        <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                            <p className='text-black dark:text-white'>{dataGajiPegawai.totalGaji}</p>
                                        </td>
                                        <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center'>
                                            <div className='items-center '>
                                                <button className='hover:text-black'>
                                                    <TfiPrinter className="text-primary text-xl hover:text-black dark:hover:text-white" />
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
                            Showing {startIndex}-{endIndex} of {DataGajiPegawaiPeople.length} Data Gaji
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
        </DefaultLayoutPegawai>
    )
}

export default DataGajiPegawai;