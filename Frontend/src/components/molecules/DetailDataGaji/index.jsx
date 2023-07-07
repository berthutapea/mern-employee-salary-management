import { useState, useEffect } from 'react';
import Layout from '../../../layout';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, ButtonTwo } from '../../../components';
import axios from 'axios';
import { getMe } from '../../../config/redux/action';

const DetailDataGaji = () => {
    const [tahun, setTahun] = useState('');
    const [bulan, setBulan] = useState('');
    const [nik, setNik] = useState('');
    const [nama_pegawai, setNamaPegawai] = useState('');
    const [jabatan, setJabatan] = useState('');
    const [gaji_pokok, setGajiPokok] = useState('');
    const [tj_transport, setTjTransport] = useState('');
    const [uang_makan, setUangMakan] = useState('');
    const [potongan, setPotongan] = useState('');
    const [total, setTotal] = useState('');
    const { name } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector((state) => state.auth);

    useEffect(() => {
        const getDataPegawai = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/data_gaji/name/${name}`);
                const data = response.data;

                setTahun(data.tahun);
                setBulan(data.bulan);
                setNik(data.nik);
                setNamaPegawai(data.nama_pegawai);
                setJabatan(data.jabatan);
                setGajiPokok(data.gaji_pokok);
                setTjTransport(data.tj_transport);
                setUangMakan(data.uang_makan);
                setPotongan(data.potongan);
                setTotal(data.total);
            } catch (error) {
                console.log(error);
            }
        };

        getDataPegawai();
    }, [name]);


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
            <Breadcrumb pageName='Detail Data Gaji Pegawai' />
            <Link to="/data-gaji" >
                <ButtonTwo  >
                    <span>Back</span>
                </ButtonTwo>
            </Link>
            <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 mt-6'>
                <div className="flex justify-between items-center mt-4 flex-col md:flex-row md:justify-between">
                </div>

                <div className='max-w-full overflow-x-auto py-4'>
                    <table className='w-full table-auto'>
                        <thead>
                            <tr className='bg-gray-2 text-left dark:bg-meta-4'>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>
                                    Tahun
                                </th>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>
                                    Bulan
                                </th>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>
                                    NIK
                                </th>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>
                                    Nama Pegawai
                                </th>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>
                                    Jabatan
                                </th>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>
                                    Gaji Pokok
                                </th>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>
                                    Tunjangan Transport
                                </th>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>
                                    Uang Makan
                                </th>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>
                                    Potongan
                                </th>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>
                                    Total
                                </th>
                            </tr>
                        </thead>
                        <tbody>
               
                                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                    <p className='text-black dark:text-white'>{tahun}</p>
                                </td>
                                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                    <p className='text-black dark:text-white'>{bulan}</p>
                                </td>
                                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                    <p className='text-black dark:text-white'>{nik}</p>
                                </td>
                                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                    <p className='text-black dark:text-white'>{nama_pegawai}</p>
                                </td>
                                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                    <p className='text-black dark:text-white'>{jabatan}</p>
                                </td>
                                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                    <p className='text-black dark:text-white'>{gaji_pokok}</p>
                                </td>
                                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                    <p className='text-black dark:text-white'>{tj_transport}</p>
                                </td>
                                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                    <p className='text-black dark:text-white'>{uang_makan}</p>
                                </td>
                                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                    <p className='text-black dark:text-white'>{potongan}</p>
                                </td>
                                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                    <p className='text-black dark:text-white'>{total}</p>
                                </td>
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    )
}

export default DetailDataGaji;