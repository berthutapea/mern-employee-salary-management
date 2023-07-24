import { useState, useEffect } from 'react';
import Layout from '../../../layout';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb } from '../../../components';
import Swal from 'sweetalert2';
import { getMe, viewGajiSinglePegawaiByMonth, viewGajiSinglePegawaiByName, viewGajiSinglePegawaiByYear } from '../../../config/redux/action';
import axios from 'axios';
import { TfiPrinter } from 'react-icons/tfi';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';

const ITEMS_PER_PAGE = 4;

const DataGajiPegawai = () => {
    const [dataGajiPegawai, setDataGajiPegawai] = useState([]);
    const [searchMonth, setSearchMonth] = useState("");
    const [searchYear, setSearchYear] = useState("");
    const [searchName, setSearchName] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showMessage, setShowMessage] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector((state) => state.auth);

    const { nama_pegawai } = useSelector((state) => state.auth.user) || "";

    const totalPages = Math.ceil(dataGajiPegawai.length / ITEMS_PER_PAGE);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handleSearch = async (event) => {
        event.preventDefault();

        const selectedMonth = searchMonth;
        const selectedYear = searchYear;
        const nama_pegawai = searchName;

        let yearDataFound = false;
        let monthDataFound = false;
        let nameDataFound = false;

        await Promise.all([
            dispatch(viewGajiSinglePegawaiByYear(selectedYear, () => (yearDataFound = true))),
            dispatch(viewGajiSinglePegawaiByMonth(selectedMonth, () => (monthDataFound = true))),
            dispatch(viewGajiSinglePegawaiByName(nama_pegawai, () => (nameDataFound = true))),
        ]);
        setShowMessage(true);

        if (yearDataFound && monthDataFound && nameDataFound) {
            setShowMessage(false);
            navigate(
                `/data-gaji-pegawai/print-page?month=${selectedMonth}&year=${selectedYear}&name=${nama_pegawai}`
            );
        } else {
            setShowMessage(false);
            Swal.fire({
                icon: 'error',
                title: 'Data tidak ditemukan',
                text: 'Maaf, data yang anda cari tidak ditemukan',
                timer: 2000,
            });
        }
    };



    const paginationItems = () => {
        const items = [];
        const maxVisiblePages = 5;

        const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        for (let page = startPage; page <= endPage; page++) {
            items.push(
                <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`py-2 px-4 border border-gray-2 text-black font-semibold dark:text-white dark:border-strokedark ${currentPage === page ? 'bg-primary text-white hover:bg-primary dark:bg-primary dark:hover:bg-primary' : 'hover:bg-gray-2 dark:hover:bg-stroke'
                        } rounded-lg`}
                >
                    {page}
                </button>
            );
        }

        if (startPage > 2) {
            items.unshift(
                <p
                    key="start-ellipsis"
                    className="py-2 px-4 border border-gray-2 dark:bg-transparent text-black font-medium bg-gray dark:border-strokedark dark:text-white"
                >
                    ...
                </p>
            );
        }

        if (endPage < totalPages - 1) {
            items.push(
                <p
                    key="end-ellipsis"
                    className="py-2 px-4 border border-gray-2 dark:bg-transparent text-black font-medium bg-gray dark:border-strokedark dark:text-white"
                >
                    ...
                </p>
            );
        }

        return items;
    };

    useEffect(() => {
        const getDataPegawai = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/data_gaji/name/${nama_pegawai}`
                );
                const data = response.data;

                setDataGajiPegawai(data);
            } catch (error) {
                console.log(error);
            }
        };

        if (nama_pegawai) { getDataPegawai(startIndex, endIndex) };
    }, [nama_pegawai, startIndex, endIndex]);

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate('/login');
        }
        if (user && user.hak_akses !== 'pegawai') {
            navigate('/dashboard');
        }
    }, [isError, user, navigate]);

    return (
        <Layout>
            <Breadcrumb pageName='Data Gaji' />

            <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 mt-6'>
                <div className='max-w-full overflow-x-auto py-4'>
                    <table className='w-full table-auto'>
                        <thead>
                            <tr className='bg-gray-2 text-left dark:bg-meta-4'>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>
                                    No
                                </th>
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
                            {dataGajiPegawai.slice(startIndex, endIndex).map((data, index) => {
                                return (
                                    <tr key={data.id}>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white text-center">{startIndex + index + 1}</p>
                                        </td>
                                        <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                            <p className='text-black dark:text-white'>{data.bulan} / {data.tahun}</p>
                                        </td>
                                        <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                            <p className='text-black dark:text-white'>Rp. {data.gaji_pokok}</p>
                                        </td>
                                        <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                            <p className='text-black dark:text-white'>Rp. {data.tj_transport}</p>
                                        </td>
                                        <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                            <p className='text-black dark:text-white'>Rp. {data.uang_makan}</p>
                                        </td>
                                        <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                            <p className='text-black dark:text-white'>Rp. {data.potongan}</p>
                                        </td>
                                        <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                            <p className='text-black dark:text-white'>Rp. {data.total}</p>
                                        </td>
                                        <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center'>
                                            <div className='items-center '>
                                                <button className='hover:text-black'>
                                                    <TfiPrinter
                                                        onClick={handleSearch}
                                                        className="text-primary text-xl hover:text-black dark:hover:text-white"
                                                    />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between items-center mt-4 flex-col md:flex-row md:justify-between">
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-5 dark:text-gray-4 text-sm py-4">
                            Menampilkan {startIndex + 1}-{Math.min(endIndex, dataGajiPegawai.length)} dari {dataGajiPegawai.length} Data Gaji
                        </span>
                    </div>
                    <div className="flex space-x-2 py-4">
                        <button
                            disabled={currentPage === 1}
                            onClick={goToPrevPage}
                            className="py-2 px-6 rounded-lg border border-primary text-primary font-semibold hover:bg-primary hover:text-white dark:text-white dark:border-primary dark:hover:bg-primary dark:hover:text-white disabled:opacity-50"
                        >
                            < MdKeyboardDoubleArrowLeft />
                        </button>
                        {paginationItems()}
                        <button
                            disabled={currentPage === totalPages}
                            onClick={goToNextPage}
                            className="py-2 px-6 rounded-lg border border-primary text-primary font-semibold hover:bg-primary hover:text-white dark:text-white dark:border-primary dark:hover:bg-primary dark:hover:text-white disabled:opacity-50"
                        >
                            < MdKeyboardDoubleArrowRight />
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default DataGajiPegawai;