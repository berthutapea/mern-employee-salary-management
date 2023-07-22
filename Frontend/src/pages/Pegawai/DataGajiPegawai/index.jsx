import { useState, useEffect } from 'react';
import Layout from '../../../layout';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Breadcrumb } from '../../../components';
import { getMe } from '../../../config/redux/action';
import axios from 'axios';
import { TfiPrinter } from 'react-icons/tfi';

const ITEMS_PER_PAGE = 4;

const DataGajiPegawai = () => {
  const [dataGajiPegawai, setDataGajiPegawai] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(ITEMS_PER_PAGE);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  const { nama_pegawai } = useSelector((state) => state.auth.user);

  // Hitung jumlah halaman total
  const totalPages = Math.ceil(dataGajiPegawai.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const getDataPegawai = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/data_gaji/name/${nama_pegawai}`);
        const data = response.data;

        setDataGajiPegawai(data);
      } catch (error) {
        console.log(error);
      }
    };

    getDataPegawai();
  }, [nama_pegawai]);

  // Event handler untuk tombol Prev
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      setStartIndex((prev) => prev - ITEMS_PER_PAGE);
      setEndIndex((prev) => prev - ITEMS_PER_PAGE);
    }
  };

  // Event handler untuk tombol Next
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      setStartIndex((prev) => prev + ITEMS_PER_PAGE);
      setEndIndex((prev) => prev + ITEMS_PER_PAGE);
    }
  };

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
    if (user && user.hak_akses !== 'pegawai') {
      navigate("/dasboard");
    }
  }, [isError, user, navigate]);

  // Ambil data gaji pegawai yang sesuai dengan halaman saat ini
  const displayedData = dataGajiPegawai.slice(startIndex, endIndex);


    return (
        <Layout>
            <Breadcrumb pageName='Data Gaji' />

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
                            {displayedData.map((data) => {
                            return (
                            <tr key={data.id}>
                                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                    <p className='text-black dark:text-white'>{data.bulan} / {data.tahun}</p>
                                </td>
                                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                    <p className='text-black dark:text-white'>{data.gaji_pokok}</p>
                                </td>
                                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                    <p className='text-black dark:text-white'>{data.tj_transport}</p>
                                </td>
                                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                    <p className='text-black dark:text-white'>{data.uang_makan}</p>
                                </td>
                                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                    <p className='text-black dark:text-white'>{data.potongan}</p>
                                </td>
                                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                    <p className='text-black dark:text-white'>{data.total}</p>
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
                            Showing {startIndex}-{endIndex} of {dataGajiPegawai.length} Data Gaji
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
        </Layout>
    )
}

export default DataGajiPegawai;