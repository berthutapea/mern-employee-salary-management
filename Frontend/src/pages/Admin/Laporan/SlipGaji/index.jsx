import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Layout from '../../../../layout';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, ButtonOne } from '../../../../components';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { TfiPrinter } from 'react-icons/tfi'
import Swal from 'sweetalert2';
import { BiSearch } from 'react-icons/bi';
import { fetchSlipGajiByMonth, fetchSlipGajiByName, fetchSlipGajiByYear, getDataPegawai, getMe } from '../../../../config/redux/action';

const SlipGaji = () => {
    const [searchMonth, setSearchMonth] = useState("");
    const [searchYear, setSearchYear] = useState("");
    const [searchName, setSearchName] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isError, user } = useSelector((state) => state.auth);
    const { dataPegawai } = useSelector((state) => state.dataPegawai);

    const handleSearchMonth = (event) => {
        setSearchMonth(event.target.value);
    };

    const handleSearchYear = (event) => {
        setSearchYear(event.target.value);
    };

    const handleSearchName = (event) => {
        setSearchName(event.target.value);
    };

    const handleSearch = async (event) => {
        event.preventDefault();

        const selectedMonth = searchMonth;
        const selectedYear = searchYear;
        const selectedName = searchName;

        let yearDataFound = false;
        let monthDataFound = false;
        let nameDataFound = false;

        await Promise.all([
            dispatch(fetchSlipGajiByYear(selectedYear, () => (yearDataFound = true))),
            dispatch(fetchSlipGajiByMonth(selectedMonth, () => (monthDataFound = true))),
            dispatch(fetchSlipGajiByName(selectedName, () => (nameDataFound = true))),
        ]);
        setShowMessage(true);

        if (yearDataFound && monthDataFound && nameDataFound) {
            setShowMessage(false);
            navigate(
                `/laporan/slip-gaji/print-page?month=${selectedMonth}&year=${selectedYear}&name=${selectedName}`
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

    const nameOptions = dataPegawai.map((pegawai) => (
        <option key={pegawai.id} value={pegawai.nama_pegawai}>
            {pegawai.nama_pegawai}
        </option>
    ));

    useEffect(() => {
        dispatch(getDataPegawai());
    }, [dispatch]);

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
            <Breadcrumb pageName='Slip Gaji Pegawai' />

            <div className='sm:grid-cols-2'>
                <div className='flex flex-col gap-9'>
                    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                            <h3 className='font-medium text-black dark:text-white'>
                                Filter Slip Gaji Pegawai
                            </h3>
                        </div>
                        <form onSubmit={handleSearch}>
                            {showMessage && (
                                <p className="text-meta-1">Data tidak ditemukan</p>
                            )}
                            <div className='p-6.5'>
                                <div className='mb-4.5 '>
                                    <div className='w-full mb-4'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Bulan <span className='text-meta-1'>*</span>
                                        </label>
                                        <div className='relative z-20 bg-transparent dark:bg-form-input'>
                                            <select className='relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                                value={searchMonth}
                                                onChange={handleSearchMonth}
                                                required
                                            >
                                                <option value=''>Pilih Bulan</option>
                                                <option value='Januari'>Januari</option>
                                                <option value='Februari'>Februari</option>
                                                <option value='Maret'>Maret</option>
                                                <option value='April'>April</option>
                                                <option value='Mei'>Mei</option>
                                                <option value='Juni'>Juni</option>
                                                <option value='Juli'>Juli</option>
                                                <option value='Agustus'>Agustus</option>
                                                <option value='September'>September</option>
                                                <option value='Oktober'>Oktober</option>
                                                <option value='November'>November</option>
                                                <option value='Desember'>Desember</option>
                                            </select>
                                            <span className='absolute top-1/2 right-4 z-30 -translate-y-1/2 text-2xl'>
                                                <MdOutlineKeyboardArrowDown />
                                            </span>
                                        </div>
                                    </div>

                                    <div className='w-full mb-4'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Tahun <span className='text-meta-1'>*</span>
                                        </label>
                                        <div className='relative z-20 bg-transparent dark:bg-form-input'>
                                            <input
                                                type="number"
                                                placeholder="Masukkan Tahun..."
                                                value={searchYear}
                                                onChange={handleSearchYear}
                                                required
                                                className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            />
                                            <span className='absolute top-1/2 right-4 z-30 -translate-y-1/2 text-2xl'>
                                                <BiSearch />
                                            </span>
                                        </div>
                                    </div>

                                    <div className='w-full mb-4'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Nama Pegawai <span className='text-meta-1'>*</span>
                                        </label>
                                        <div className='relative z-20 bg-transparent dark:bg-form-input'>
                                            <select className='relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                                value={searchName}
                                                onChange={handleSearchName}
                                                required
                                            >
                                                <option value=''>Pilih Nama Pegawai</option>
                                                {nameOptions}
                                            </select>
                                            <span className='absolute top-1/2 right-4 z-30 -translate-y-1/2 text-2xl'>
                                                <MdOutlineKeyboardArrowDown />
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-col md:flex-row w-full gap-3 text-center'>
                                    <ButtonOne type='submit'>
                                        <span>Cetak Slip Gaji</span>
                                        <span>
                                            <TfiPrinter />
                                        </span>
                                    </ButtonOne>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default SlipGaji;