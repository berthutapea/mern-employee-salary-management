import React from 'react';
import { Link } from "react-router-dom";
import DefaultLayoutAdmin from '../../../../layout/DefaultLayoutAdmin';
import { BreadcrumbAdmin, ButtonOne, ButtonTwo, ButtonThree } from '../../..';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

const FormDataPegawai = () => {
  return (
    <DefaultLayoutAdmin>
      <BreadcrumbAdmin pageName='Form Pegawai' />

      <div className='sm:grid-cols-2'>
        <div className='flex flex-col gap-9'>
          {/* <!-- Form Data Pegawai --> */}
          <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
            <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
              <h3 className='font-medium text-black dark:text-white'>
                Form Data Pegawai
              </h3>
            </div>
            <form action='#'>
              <div className='p-6.5'>
                <div className='mb-4.5 flex flex-col gap-6 xl:flex-row'>
                  <div className='w-full xl:w-1/2'>
                    <label className='mb-2.5 block text-black dark:text-white'>
                      NIK <span className='text-meta-1'>*</span>
                    </label>
                    <input
                      type='number'
                      placeholder='Masukkan nomor nik'
                      className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                    />
                  </div>

                  <div className='w-full xl:w-1/2'>
                    <label className='mb-2.5 block text-black dark:text-white'>
                      Nama Lengkap <span className='text-meta-1'>*</span>
                    </label>
                    <input
                      type='text'
                      placeholder='Masukkan nama lengkap'
                      className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                    />
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className='w-full xl:w-1/2'>
                    <label className='mb-2.5 block text-black dark:text-white'>
                      Username <span className='text-meta-1'>*</span>
                    </label>
                    <input
                      type='username'
                      placeholder='Masukkan username'
                      className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                    />
                  </div>

                  <div className='w-full xl:w-1/2'>
                    <label className='mb-2.5 block text-black dark:text-white'>
                      Password <span className='text-meta-1'>*</span>
                    </label>
                    <input
                      type='password'
                      placeholder='Masukkan password'
                      className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                    />
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className='w-full xl:w-1/2'>
                    <label className='mb-2.5 block text-black dark:text-white'>
                      Jenis Kelamin <span className='text-meta-1'>*</span>
                    </label>
                    <div className='relative z-20 bg-transparent dark:bg-form-input'>
                      <select className='relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'>
                        <option value=''>Silahkan pilih</option>
                        <option value=''>Laki-Laki</option>
                        <option value=''>Perempuan</option>
                      </select>
                      <span className='absolute top-1/2 right-4 z-30 -translate-y-1/2 text-2xl'>
                        <MdOutlineKeyboardArrowDown />
                      </span>
                    </div>
                  </div>
                  <div className='w-full xl:w-1/2'>
                    <label className='mb-2.5 block text-black dark:text-white'>
                      Jabatan <span className='text-meta-1'>*</span>
                    </label>
                    <div className='relative z-20 bg-transparent dark:bg-form-input'>
                      <select className='relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'>
                        <option value=''>Silahkan Pilih</option>
                        <option value=''>HRD</option>
                        <option value=''>Staf Marketing</option>
                        <option value=''>Admin</option>
                        <option value=''>Sales</option>
                      </select>
                      <span className='absolute top-1/2 right-4 z-30 -translate-y-1/2 text-2xl'>
                        <MdOutlineKeyboardArrowDown />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className='w-full xl:w-1/2'>
                    <label className='mb-2.5 block text-black dark:text-white'>
                      Tanggal Masuk <span className='text-meta-1'>*</span>
                    </label>
                    <input
                      type='date'
                      className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                    />
                  </div>
                  <div className='w-full xl:w-1/2'>
                    <label className='mb-2.5 block text-black dark:text-white'>
                      Status <span className='text-meta-1'>*</span>
                    </label>
                    <div className='relative z-20 bg-transparent dark:bg-form-input'>
                      <select className='relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'>
                        <option value=''>Silahkan Pilih</option>
                        <option value=''>Karyawan Tetap</option>
                        <option value=''>Karyawan Tidak Tetap</option>
                      </select>
                      <span className='absolute top-1/2 right-4 z-30 -translate-y-1/2 text-2xl'>
                        <MdOutlineKeyboardArrowDown />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className='w-full xl:w-1/2'>
                    <label className='mb-2.5 block text-black dark:text-white'>
                      Hak Akses <span className='text-meta-1'>*</span>
                    </label>
                    <div className='relative z-20 bg-transparent dark:bg-form-input'>
                      <select className='relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'>
                        <option value=''>Silahkan pilih</option>
                        <option value=''>Admin</option>
                        <option value=''>Pegawai</option>
                      </select>
                      <span className='absolute top-1/2 right-4 z-30 -translate-y-1/2 text-2xl'>
                        <MdOutlineKeyboardArrowDown />
                      </span>
                    </div>
                  </div>

                  <div className='w-full xl:w-1/2'>
                    <label className='mb-2.5 block text-black dark:text-white'>
                      Photo <span className='text-meta-1'>*</span>
                    </label>
                    <input
                      type='file'
                      className='w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke dark:file:border-strokedark file:bg-[#EEEEEE] dark:file:bg-white/30 dark:file:text-white file:py-1 file:px-2.5 file:text-sm file:font-medium focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input'
                    />
                  </div>
                </div>
                {/* <!-- Form Data Pegawai --> */}

                <div className='flex flex-col md:flex-row w-full gap-3 text-center'>
                  <Link to="/" >
                    <ButtonOne  >
                      <span>Simpan</span>
                    </ButtonOne>
                  </Link>
                  <Link to="/admin/master-data/data-pegawai/form-data-pegawai" >
                    <ButtonTwo>
                      <span>Reset</span>
                    </ButtonTwo>
                  </Link>
                  <Link to="/admin/master-data/data-pegawai" >
                    <ButtonThree  >
                      <span>Kembali</span>
                    </ButtonThree>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayoutAdmin>
  )
}

export default FormDataPegawai;
