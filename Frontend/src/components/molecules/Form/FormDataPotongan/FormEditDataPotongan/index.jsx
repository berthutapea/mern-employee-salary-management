import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';
import Layout from '../../../../../layout';
import { Breadcrumb, ButtonOne, ButtonTwo } from '../../../../../components';
import { getMe } from '../../../../../config/redux/action';

const FormEditDataPotongan = () => {
    const [potongan, setPotongan] = useState('');
    const [jmlPotongan, setJmlPotongan] = useState('');
    const [msg, setMsg] = useState('');
    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isError, user } = useSelector((state) => state.auth);

    const updateDataPotongan = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('potongan', potongan);
            formData.append('jml_potongan', jmlPotongan);

            const response = await axios.patch(`http://localhost:5000/data_potongan/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMsg(response.data.msg);
            Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                timer: 1500,
                text: response.data.msg
            });
            navigate('/data-potongan');
        } catch (error) {
            setMsg(error.response.data.msg);
            Swal.fire({
                icon: 'error',
                title: 'Gagal',
                text: error.response.data.msg
            });
        }
    };
    
    useEffect(() => {
        const getDataById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/data_potongan/${id}`);
                setPotongan(response.data.potongan);
                setJmlPotongan(response.data.jml_potongan);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        }
        getDataById();
    }, [id]);


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
            <Breadcrumb pageName='Form Edit Data Potongan' />

            <div className='sm:grid-cols-2'>
                <div className='flex flex-col gap-9'>
                    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                            <h3 className='font-medium text-black dark:text-white'>
                                Form Edit Data Potongan
                            </h3>
                        </div>
                        <form onSubmit={updateDataPotongan}>
                            <div className='p-6.5'>
                                <div className='mb-4.5 '>
                                    <div className='w-full mb-4'>
                                        <label className='mb-4 block text-black dark:text-white'>
                                            Potongan <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='text'
                                            id='potongan'
                                            name='potongan'
                                            value={potongan}
                                            onChange={(e) => setPotongan(e.target.value)}
                                            required={true}
                                            placeholder='Masukkan potongan'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>

                                    <div className='w-full mb-4'>
                                        <label className='mb-4 block text-black dark:text-white'>
                                            Jumlah Potongan <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='number'
                                            id='jmlPotongan'
                                            name='jmlPotongan'
                                            value={jmlPotongan}
                                            onChange={(e) => setJmlPotongan(e.target.value)}
                                            required
                                            placeholder='Masukkan jumlah potongan'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>
                                </div>

                                <div className='flex flex-col md:flex-row w-full gap-3 text-center'>
                                    <div>
                                        <ButtonOne  >
                                            <span>Perbarui</span>
                                        </ButtonOne>
                                    </div>
                                    <Link to="/data-potongan" >
                                        <ButtonTwo  >
                                            <span>Kembali</span>
                                        </ButtonTwo>
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default FormEditDataPotongan;
