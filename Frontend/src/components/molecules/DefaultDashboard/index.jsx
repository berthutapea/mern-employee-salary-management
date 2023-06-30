import React from "react";
import { useSelector } from 'react-redux';
import Layout from '../../../layout';
import { CardOne, CardTwo, CardThree, CardFour, ChartOne, ChartTwo, Breadcrumb } from '../../../components';

const DefaultDashboard = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <Layout>
            <Breadcrumb pageName='Dashboard' />
            {user && user.hak_akses === "admin" && (
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
                    <CardOne />
                    <CardTwo />
                    <CardThree />
                    <CardFour />
                </div>
            )}
            {user && user.hak_akses === "admin" && (
                <div className="mt-4 grid grid-cols-12 gap-6 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                    <div className="col-span-12 sm:col-span-7">
                        <ChartOne />
                    </div>
                    <div className="col-span-12 sm:col-span-5">
                        <ChartTwo />
                    </div>
                </div>
            )}
            {user && user.hak_akses === "pegawai" && (
                <>
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
                            <img
                                className="rounded-xl h-80 w-full md:w-80 object-cover"
                                // src={`http://localhost:5000/images/${dataPegawai.photo}`}
                                alt="People"
                            />
                        </div>
                        <div className="md:w-2/3 px-4 md:px-20 py-4 md:py-20">
                            <div className="w-full md:text-lg">
                                <h2 className="font-medium mb-4 block text-black dark:text-white">
                                    <span className="inline-block w-32 md:w-40">Nama Pegawai</span>
                                    <span className="inline-block w-7">:</span>
                                </h2>
                                <h2 className="font-medium mb-4 block text-black dark:text-white">
                                    <span className="inline-block w-32 md:w-40">Jabatan</span>
                                    <span className="inline-block w-7">:</span>{' '}
                                    <span className="pl-[-10] md:pl-0"></span>
                                </h2>
                                <h2 className="font-medium mb-4 block text-black dark:text-white">
                                    <span className="inline-block w-32 md:w-40">Tanggal Masuk</span>
                                    <span className="inline-block w-7">:</span>
                                </h2>
                                <h2 className="font-medium mb-4 block text-black dark:text-white">
                                    <span className="inline-block w-32 md:w-40">Status</span>
                                    <span className="inline-block w-7">:</span>
                                    <span className="pl-[-8] md:pl-0"></span>
                                </h2>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Layout>
    );
};

export default DefaultDashboard;





// import React from "react";
// import { useSelector } from 'react-redux';
// import Layout from '../../../layout';
// import { CardOne, CardTwo, CardThree, CardFour, ChartOne, ChartTwo, Breadcrumb } from '../../../components';

// const DefaultDashboard = () => {
//     const { user } = useSelector((state) => state.auth);

//     if (user && user.hak_akses === "admin") {
//         return (
//             <Layout>
//                 <Breadcrumb pageName='Dashboard' />
//                 <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
//                     <CardOne />
//                     <CardTwo />
//                     <CardThree />
//                     <CardFour />
//                 </div>

//                 <div className="mt-4 grid grid-cols-12 gap-6 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
//                     <div className="col-span-12 sm:col-span-7">
//                         <ChartOne />
//                     </div>
//                     <div className="col-span-12 sm:col-span-5">
//                         <ChartTwo />
//                     </div>
//                 </div>
//             </Layout>
//         );
//     } else {
//         return (
//             <Layout>
//                 <>
//                     <Breadcrumb pageName="Dashboard" />
//                     <div className="mt-6">
//                         <h2 className="px-4 py-2 text-meta-3 font-medium text-center md:text-left">
//                             Selamat Datang, Anda Login Sebagai Pegawai.
//                         </h2>
//                     </div>
//                     <div className="py-2 px-4 md:px-6 dark:border-strokedark text-lg">
//                         <h3 className="font-medium text-black dark:text-white text-center md:text-left">
//                             Data Pegawai
//                         </h3>
//                     </div>
//                     <div className="flex flex-col md:flex-row rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mt-2">
//                         <div className="md:w-1/3 w-full px-4 py-4 flex justify-center md:justify-start">
//                             <img
//                                 className="rounded-xl h-80 w-full md:w-80 object-cover"
//                                 // src={`http://localhost:5000/images/${dataPegawai.photo}`}
//                                 alt="People"
//                             />
//                         </div>
//                         <div className="md:w-2/3 px-4 md:px-20 py-4 md:py-20">
//                             <div className="w-full md:text-lg">
//                                 <h2 className="font-medium mb-4 block text-black dark:text-white">
//                                     <span className="inline-block w-32 md:w-40">Nama Pegawai</span>
//                                     <span className="inline-block w-7">:</span>
//                                 </h2>
//                                 <h2 className="font-medium mb-4 block text-black dark:text-white">
//                                     <span className="inline-block w-32 md:w-40">Jabatan</span>
//                                     <span className="inline-block w-7">:</span>{' '}
//                                     <span className="pl-[-10] md:pl-0"></span>
//                                 </h2>
//                                 <h2 className="font-medium mb-4 block text-black dark:text-white">
//                                     <span className="inline-block w-32 md:w-40">Tanggal Masuk</span>
//                                     <span className="inline-block w-7">:</span>
//                                 </h2>
//                                 <h2 className="font-medium mb-4 block text-black dark:text-white">
//                                     <span className="inline-block w-32 md:w-40">Status</span>
//                                     <span className="inline-block w-7">:</span>
//                                     <span className="pl-[-8] md:pl-0"></span>
//                                 </h2>
//                             </div>
//                         </div>
//                     </div>
//                 </>
//             </Layout>
//         );
//     }
// };

// export default DefaultDashboard;
