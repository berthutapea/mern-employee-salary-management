import React from 'react';
import DefaultLayoutPegawai from '../../../layout/DefaultLayoutPegawai';
import { BreadcrumbPegawai } from '../../../components';
import PegawaiPeople from '../../../assets/images/user/gilbert.png'

const DashboardPegawai = () => {
    return (
        <DefaultLayoutPegawai>
            <BreadcrumbPegawai pageName='Dashboard' />
            <div className="mt-6">
                <h2 className="px-4 py-2 text-meta-3 font-medium text-center md:text-left">
                    Selamat Datang, Anda Login Sebagai Pegawai.
                </h2>
            </div>
            <div className="py-2 px-4 md:px-6 dark:border-strokedark text-lg">
                <h3 className="font-medium text-black dark:text-white text-center md:text-left">
                    Data Pegawai
                </h3>
            </div>
            <div className="flex flex-col md:flex-row rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mt-2">
                <div className="md:w-1/3 w-full px-4 py-4 flex justify-center md:justify-start">
                    <img className="rounded-xl h-80 w-full md:w-80 object-cover" src={PegawaiPeople} alt="Gilbert Hutapea" />
                </div>
                <div className="md:w-2/3 px-4 md:px-20 py-4 md:py-20">
                    <div className="w-full md:text-lg">
                        <h2 className="font-medium mb-4 block text-black dark:text-white">
                            <span className="inline-block w-32 md:w-40">Nama Pegawai</span><span className="inline-block w-7">:</span> Gilbert Hutapea
                        </h2>
                        <h2 className="font-medium mb-4 block text-black dark:text-white">
                            <span className="inline-block w-32 md:w-40">Jabatan</span><span className="inline-block w-7">:</span> <span className="pl-[-10] md:pl-0">FullStack Developer</span>
                        </h2>
                        <h2 className="font-medium mb-4 block text-black dark:text-white">
                            <span className="inline-block w-32 md:w-40">Tanggal Masuk</span><span className="inline-block w-7">:</span> 15-01-2023
                        </h2>
                        <h2 className="font-medium mb-4 block text-black dark:text-white">
                            <span className="inline-block w-32 md:w-40">Status</span><span className="inline-block w-7">:</span><span className="pl-[-8] md:pl-0"> Karyawan Tetap</span>
                        </h2>
                    </div>
                </div>
            </div>


        </DefaultLayoutPegawai>
    )
}

export default DashboardPegawai;
