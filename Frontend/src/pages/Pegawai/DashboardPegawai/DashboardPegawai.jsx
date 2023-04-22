import React from 'react';
import DefaultLayoutPegawai from '../../../layout/DefaultLayoutPegawai/DefaultLayoutPegawai';
import BreadcrumbPegawai from '../../../components/Breadcrumb/BreadcrumbPegawai/BreadcrumbPegawai';
import PegawaiPeople from '../../../assets/images/user/gilbert.png'

const DashboardPegawai = () => {
    return (
        <DefaultLayoutPegawai>
            <BreadcrumbPegawai pageName='Dashboard' />
            <div className="mt-6">
                <h2 className="px-4 py-2 text-black dark:text-white font-medium">
                    Selamat Datang, Anda Login Sebagai Pegawai
                </h2>
            </div>
            <div className='py-2 px-6.5 dark:border-strokedark'>
                <h3 className='font-medium text-black dark:text-white'>
                    Data Pegawai
                </h3>
            </div>
            <div className="flex flex-col md:flex-row rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mt-2">
                <div className="md:w-1/3 drop-shadow-2 w-full px-4 py-4 flex justify-center md:justify-start">
                    <img className="rounded-xl h-50 w-50 object-cover" src={PegawaiPeople} alt="Gilbert Hutapea" />
                </div>
                <div className="md:w-2/3 px-4 py-6">
                    <div className="w-full">
                        <h2 className=" font-medium mb-2.5 block text-black dark:text-white">
                            Nama Lengkap: Gilbert Hutapea
                        </h2>
                        <h2 className=" font-medium mb-2.5 block text-black dark:text-white">
                            Jabatan: FullStack Developer
                        </h2>
                        <h2 className=" font-medium mb-2.5 block text-black dark:text-white">
                            Tanggal Masuk: 15-01-2023
                        </h2>
                        <h2 className=" font-medium mb-2.5 block text-black dark:text-white">
                            Status: Karyawan Tetap
                        </h2>
                    </div>
                </div>
            </div>

        </DefaultLayoutPegawai>
    )
}

export default DashboardPegawai;
