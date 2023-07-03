import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../../../../layout';
import Swal from 'sweetalert2';
import { Breadcrumb, ButtonOne, ButtonTwo } from '../../../../../components';
import { BiSearch } from 'react-icons/bi';
import {
    createDataKehadiran,
    getDataPegawai,
    getMe,
} from '../../../../../config/redux/action';

const ITEMS_PER_PAGE = 4;

const FormAddDataKehadiran = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [formData, setFormData] = useState({
        hadir: '',
        sakit: '',
        alpha: '',
    });
    const { hadir, sakit, alpha } = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector((state) => state.auth);
    const { dataPegawai } = useSelector((state) => state.dataPegawai);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const totalPages = Math.ceil(dataPegawai.length / ITEMS_PER_PAGE);

    const filteredDataPegawai = dataPegawai.filter((pegawai) =>
        pegawai.nama_pegawai.toLowerCase().includes(searchKeyword.toLowerCase())
    );

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

    const handleSearch = (event) => {
        setSearchKeyword(event.target.value);
    };

    const submitDataKehadiran = (e) => {
        e.preventDefault();
        const newFormData = {
            hadir,
            sakit,
            alpha,
        };

        dispatch(createDataKehadiran(newFormData, navigate))
            .then((response) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: response.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .catch((error) => {
                let errorMessage = 'Terjadi kesalahan';

                if (error.response && error.response.data && error.response.data.msg) {
                    errorMessage = error.response.data.msg;
                } else if (error.message) {
                    errorMessage = error.message;
                }

                Swal.fire({
                    icon: 'error',
                    title: 'Gagal',
                    text: errorMessage,
                    confirmButtonText: 'Ok',
                });
            });
    };

    const handleChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
    };

    useEffect(() => {
        dispatch(getDataPegawai(startIndex, endIndex));
    }, [dispatch, startIndex, endIndex]);

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
                    className={`py-2 px-4 border border-gray-2 text-black font-semibold dark:text-white dark:border-strokedark ${currentPage === page
                        ? 'bg-primary text-white hover:bg-primary dark:bg-primary dark:hover:bg-primary'
                        : 'hover:bg-gray-2 dark:hover:bg-stroke'
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

    return (
        <Layout>
            <Breadcrumb pageName="Form Data Kehadiran Pegawai" />
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 mt-6">
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
                    <form onSubmit={submitDataKehadiran}>
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
                                        Jenis Kelamin
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                                        Jabatan
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
                                {filteredDataPegawai
                                    .slice(startIndex, endIndex)
                                    .map((data, index) => {
                                        const { nik, nama_pegawai, jenis_kelamin, jabatan } = data;
                                        const inputHadirId = `hadir-${index}`;
                                        const inputSakitId = `sakit-${index}`;
                                        const inputAlphaId = `alpha-${index}`;

                                        return (
                                            <tr
                                                key={data.id}
                                                className="border-b border-[#eee] dark:border-strokedark"
                                            >
                                                <td className="py-5 px-4">
                                                    <p className="text-black dark:text-white">{startIndex + index + 1}</p>
                                                </td>
                                                <td className="py-5 px-4">
                                                    <p className="text-black dark:text-white">{nik}</p>
                                                </td>
                                                <td className="py-5 px-4">
                                                    <p className="text-black dark:text-white">{nama_pegawai}</p>
                                                </td>
                                                <td className="py-5 px-4">
                                                    <p className="text-black dark:text-white">{jenis_kelamin}</p>
                                                </td>
                                                <td className="py-5 px-4">
                                                    <p className="text-black dark:text-white">{jabatan}</p>
                                                </td>
                                                <td className="py-5 px-4">
                                                    <input
                                                        type="number"
                                                        id={inputHadirId}
                                                        name={inputHadirId}
                                                        value={hadir[index]}
                                                        onChange={(e) => handleChange(e, index, 'hadir')}
                                                        className="form-input h-8 w-10 text-center border rounded-md"
                                                        min="0"
                                                        placeholder="0"
                                                    />
                                                </td>
                                                <td className="py-5 px-4">
                                                    <input
                                                        type="number"
                                                        id={inputSakitId}
                                                        name={inputSakitId}
                                                        value={sakit[index]}
                                                        onChange={(e) => handleChange(e, index, 'sakit')}
                                                        className="form-input h-8 w-10 text-center border rounded-md"
                                                        min="0"
                                                        placeholder="0"
                                                    />
                                                </td>
                                                <td className="py-5 px-4">
                                                    <input
                                                        type="number"
                                                        id={inputAlphaId}
                                                        name={inputAlphaId}
                                                        value={alpha[index]}
                                                        onChange={(e) => handleChange(e, index, 'alpha')}
                                                        className="form-input h-8 w-10 text-center border rounded-md"
                                                        min="0"
                                                        placeholder="0"
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                        <div className="flex flex-col md:flex-row w-full gap-3 text-center py-4">
                            <div>
                                <ButtonOne type="submit">
                                    <span>Save</span>
                                </ButtonOne>
                            </div>
                            <Link to="/data-kehadiran">
                                <ButtonTwo>
                                    <span>Back</span>
                                </ButtonTwo>
                            </Link>
                        </div>
                    </form>
                </div>

                <div className="flex justify-between items-center mt-4 flex-col md:flex-row md:justify-between">
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-5 dark:text-gray-4 text-sm py-4">
                            Showing {startIndex + 1}-{Math.min(endIndex, filteredDataPegawai.length)} of {filteredDataPegawai.length} Data Pegawai
                        </span>
                    </div>
                    <div className="flex space-x-2 py-4">
                        <button
                            disabled={currentPage === 1}
                            onClick={goToPrevPage}
                            className="py-2 px-6 rounded-lg border border-primary text-primary font-semibold hover:bg-primary hover:text-white dark:text-white dark:border-primary dark:hover:bg-primary dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        {paginationItems()}
                        <button
                            disabled={currentPage === totalPages}
                            onClick={goToNextPage}
                            className="py-2 px-6 rounded-lg border border-primary text-primary font-semibold hover:bg-primary hover:text-white dark:text-white dark:border-primary dark:hover:bg-primary dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default FormAddDataKehadiran;
