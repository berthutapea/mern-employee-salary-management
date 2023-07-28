import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import Layout from '../../../../../layout';
import Swal from 'sweetalert2';
import { Breadcrumb, ButtonOne, ButtonTwo } from '../../../../../components';
import { BiSearch } from 'react-icons/bi';
import { getMe } from '../../../../../config/redux/action';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';

const ITEMS_PER_PAGE = 4;

const FormAddDataKehadiran = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPegawai, setDataPegawai] = useState([]);
    const [dataKehadiran, setDataKehadiran] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const { isError, user } = useSelector((state) => state.auth);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const totalPages = Math.ceil(dataPegawai.length / ITEMS_PER_PAGE);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const filteredDataPegawai = dataPegawai.filter((pegawai) =>
        pegawai.nama_pegawai.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    const getDataPegawai = async () => {
        const response = await axios.get("http://localhost:5000/data_pegawai");
        setDataPegawai(response.data);
    };

    const getDataKehadiran = async () => {
        try {
            const response = await axios.get("http://localhost:5000/data_kehadiran");
            setDataKehadiran(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


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

    const [hadir, setHadir] = useState([]);
    const [sakit, setSakit] = useState([]);
    const [alpha, setAlpha] = useState([]);

    const handleHadir = (index, value) => {
        const updateHadir = [...hadir];
        updateHadir[index] = value;
        setHadir(updateHadir);
    };

    const handleSakit = (index, value) => {
        const updateSakit = [...sakit];
        updateSakit[index] = value;
        setSakit(updateSakit);
    };

    const handleAlpha = (index, value) => {
        const updateAlpha = [...alpha];
        updateAlpha[index] = value;
        setAlpha(updateAlpha);
    };

    const handleSearch = (e) => {
        setSearchKeyword(e.target.value);
    };

    const saveDataKehadiran = async (e) => {
        e.preventDefault();

        try {
            for (let i = 0; i < dataPegawai.length; i++) {
                const isNamaAda = dataKehadiran.some(
                    (kehadiran) => kehadiran.nama_pegawai === dataPegawai[i].nama_pegawai
                );

                if (!isNamaAda) {
                    await axios.post("http://localhost:5000/data_kehadiran", {
                        nik: dataPegawai[i].nik,
                        nama_pegawai: dataPegawai[i].nama_pegawai,
                        nama_jabatan: dataPegawai[i].jabatan,
                        jenis_kelamin: dataPegawai[i].jenis_kelamin,
                        hadir: hadir[i] || 0,
                        sakit: sakit[i] || 0,
                        alpha: alpha[i] || 0,
                    });
                    navigate("/data-kehadiran");
                    Swal.fire({
                        icon: 'success',
                        title: "Berhasil",
                        text: "Data Berhasil di Simpan",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            }
        } catch (error) {
            if (error.response) {
                Swal.fire({
                    title: "Error",
                    text: error.response.data.msg,
                    icon: "error",
                });
            }
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
        getDataPegawai();
        getDataKehadiran();
    }, []);

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate('/login');
        }
        if (user && user.hak_akses !== 'admin') {
            navigate('/dashboard');
        }
    }, [isError, user, navigate]);

    return (
        <Layout>
            <Breadcrumb pageName="Form Data Kehadiran Pegawai" />
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 mt-6">
                <form onSubmit={saveDataKehadiran}>
                    <div className="flex justify-between items-center mt-4 flex-col md:flex-row md:justify-between">
                        <div className="relative flex-2 mb-4 md:mb-0">
                            <input
                                type="text"
                                placeholder="Cari Nama Pegawai..."
                                value={searchKeyword}
                                onChange={handleSearch}
                                className="rounded-lg border-[1.5px] border-stroke bg-transparent py-2 pl-10 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary left-0"
                            />
                            <span className="absolute left-2 py-3 text-xl">
                                <BiSearch />
                            </span>
                        </div>
                    </div>
                    <div className="max-w-full overflow-x-auto py-4">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                    <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                        No
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                        NIK
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                                        Nama Pegawai
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                                        Jabatan
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                                        Jenis Kelamin
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                                        Hadir
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                                        Sakit
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                                        Alpha
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredDataPegawai.slice(startIndex, endIndex).map((data, index) => {
                                    const isNamaAda = dataKehadiran.some(
                                        (kehadiran) => kehadiran.nama_pegawai === data.nama_pegawai
                                    );

                                    if (isNamaAda) {
                                        return <tr
                                            key={data.id}
                                            className="border-b border-[#eee] dark:border-strokedark"
                                        >
                                            <td className="py-5 px-4">
                                                <p className="text-center text-black dark:text-white">{startIndex + index + 1}</p>
                                            </td>
                                            <td className="py-5 px-4"
                                                colSpan="8">
                                                <p className="text-center text-black dark:text-white">Data Kehadiran Pegawai Sudah di Simpan. Input Kembali Ketika Sudah Ganti Periode !</p>
                                            </td>
                                        </tr>;
                                    }

                                    return (
                                        <tr
                                            key={data.id}
                                            className="border-b border-[#eee] dark:border-strokedark"
                                        >
                                            <td className="py-5 px-4">
                                                <p className="text-center text-black dark:text-white">{startIndex + index + 1}</p>
                                            </td>
                                            <td className="py-5 px-4">
                                                <p className="text-black dark:text-white">{data.nik}</p>
                                            </td>
                                            <td className="py-5 px-4">
                                                <p className="text-black dark:text-white">{data.nama_pegawai}</p>
                                            </td>
                                            <td className="py-5 px-4">
                                                <p className="text-black dark:text-white">{data.jabatan}</p>
                                            </td>
                                            <td className="py-5 px-4">
                                                <p className="text-black dark:text-white">{data.jenis_kelamin}</p>
                                            </td>
                                            <td className="py-5 px-4">
                                                <input
                                                    type="number"
                                                    placeholder="0"
                                                    value={hadir[index] || ""}
                                                    onChange={(e) => handleHadir(index, e.target.value)}
                                                    className="form-input h-8 w-10 text-center border rounded-md disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input"
                                                    min="0"
                                                    required
                                                />
                                            </td>
                                            <td className="py-5 px-4">
                                                <input
                                                    type="number"
                                                    placeholder="0"
                                                    value={sakit[index] || ""}
                                                    onChange={(e) => handleSakit(index, e.target.value)}
                                                    className="form-input h-8 w-10 text-center border rounded-md disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input"
                                                    min="0"
                                                    required
                                                />
                                            </td>
                                            <td className="py-5 px-4">
                                                <input
                                                    type="number"
                                                    placeholder="0"
                                                    value={alpha[index] || ""}
                                                    onChange={(e) => handleAlpha(index, e.target.value)}
                                                    className="form-input h-8 w-10 text-center border rounded-md disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input"
                                                    min="0"
                                                    required
                                                />
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
                                Menampilkan {startIndex + 1}-{Math.min(endIndex, filteredDataPegawai.length)} dari {filteredDataPegawai.length} Data Kehadiran Pegawai
                            </span>

                        </div>
                        <div className="flex space-x-2 py-4">
                            <button
                                disabled={currentPage === 1}
                                onClick={goToPrevPage}
                                className="py-2 px-6 rounded-lg border border-primary text-primary font-semibold hover:bg-primary hover:text-white dark:text-white dark:border-primary dark:hover:bg-primary dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                < MdKeyboardDoubleArrowLeft />
                            </button>
                            {paginationItems()}
                            <button
                                disabled={currentPage === totalPages}
                                onClick={goToNextPage}
                                className="py-2 px-6 rounded-lg border border-primary text-primary font-semibold hover:bg-primary hover:text-white dark:text-white dark:border-primary dark:hover:bg-primary dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                < MdKeyboardDoubleArrowRight />
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row w-full gap-3 text-center py-4">
                        <div>
                            <ButtonOne type="submit">
                                <span>Simpan</span>
                            </ButtonOne>
                        </div>
                        <Link to="/data-kehadiran">
                            <ButtonTwo>
                                <span>Kembali</span>
                            </ButtonTwo>
                        </Link>
                    </div>
                </form>
            </div>
        </Layout >
    );
};


export default FormAddDataKehadiran;
