import React, { useRef, useEffect, useState } from "react";
import LogoPt from "../../../../assets/images/logo/logo-dark.svg";
import LogoSipeka from "../../../../assets/images/logo/logo-sipeka.png";
import { useReactToPrint } from "react-to-print";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDataGaji, getMe } from "../../../../config/redux/action";
import { ButtonOne, ButtonTwo } from "../../../atoms";

const PrintPdfDataGaji = () => {
    const componentRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [bulan, setBulan] = useState("");
    const [tahun, setTahun] = useState("");

    const { isError, user } = useSelector((state) => state.auth);
    const { dataGaji } = useSelector((state) => state.dataGaji);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Data_Gaji_Pegawai_PT. Humpuss Karbometil Selulosa",
    });

    useEffect(() => {
        dispatch(getDataGaji());
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate("/login");
        }
        if (user && user.hak_akses !== "admin") {
            navigate("/dashboard");
        } else {
            handlePrint();
        }
    }, [isError, user, navigate, handlePrint]);

    useEffect(() => {
        const today = new Date();
        const month = today.toLocaleString("default", { month: "long" });
        const year = today.getFullYear();
        setBulan(month);
        setTahun(year);
    }, []);

    return (
        <>
            <div className="flex flex-col md:flex-row w-full gap-3 text-center p-6 bg-white dark:bg-meta-4">
                <div>
                    <ButtonOne onClick={handlePrint}>
                        <span>Cetak</span>
                    </ButtonOne>
                </div>
                <Link to="/data-gaji">
                    <ButtonTwo>
                        <span>Kembali</span>
                    </ButtonTwo>
                </Link>
            </div >
            <div ref={componentRef} className="w-200% h-100% p-10 bg-white dark:bg-meta-4">
                <div className="flex items-center gap-24 object-cover border-b-4 border-black dark:border-white">
                    <img className="w-35"
                        src={LogoSipeka}
                        title="Logo SiPeKa"
                        alt="Logo SiPeKa" />
                    <h1 className="text-black text-2xl font-bold boder  dark:text-white">
                        PT. Humpuss Karbometil Selulosa
                    </h1>
                    <img className="w-35"
                        src={LogoPt}
                        title="Logo PT.Humpuss Karbometil Selulosa"
                        alt="Logo PT.Humpuss Karbometil Selulosa"
                    />
                </div>
                <h1 className="text-center text-black my-4 text-xl font-medium boder py-2 dark:text-white">
                    Daftar Gaji Pegawai
                </h1>
                <div className="w-full md:text-lg">
                    <h2 className="font-medium mb-4 block text-black dark:text-white">
                        <span className="inline-block w-32 md:w-40">Bulan</span>
                        <span className="pl-[-8] md:pl-0"></span>
                        <span className="inline-block w-7">:</span>
                        {bulan}
                    </h2>
                    <h2 className="font-medium mb-4 block text-black dark:text-white">
                        <span className="inline-block w-32 md:w-40">Tahun</span>
                        <span className="inline-block w-7">:</span>
                        {tahun}
                        <span className="pl-[-8] md:pl-0"></span>
                    </h2>
                </div>
                <div className="max-w-full overflow-x-auto py-4">
                    <table className="w-full table-auto-full">
                        <thead>
                            <tr>
                                <th className="font-medium text-black border-b border-t border-l  border-black dark:border-white dark:text-white">
                                    No
                                </th>
                                <th className="font-medium text-black border-t border-l border-b border-black dark:border-white dark:text-white">
                                    NIK
                                </th>
                                <th className="font-medium text-black border-t border-l border-b border-black dark:border-white dark:text-white">
                                    Nama <br /> Pegawai
                                </th>
                                <th className="font-medium text-black border-t border-l border-b border-black dark:border-white dark:text-white">
                                    Jabatan
                                </th>
                                <th className="font-medium text-black border-t border-l border-b border-black dark:border-white dark:text-white">
                                    Gaji <br /> Pokok
                                </th>
                                <th className="font-medium text-black border-t border-l border-b border-black dark:border-white dark:text-white">
                                    Tunjangan <br />Transport
                                </th>
                                <th className="font-medium text-black border-t border-l border-b border-black dark:border-white dark:text-white">
                                    Uang <br /> Makan
                                </th>
                                <th className="font-medium text-black border-t border-l border-b border-black dark:border-white dark:text-white">
                                    Potongan
                                </th>
                                <th className="font-medium text-black border-t border-l border-b border-r border-black dark:border-white dark:text-white">
                                    Total <br /> Gaji
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataGaji.map((data, index) => {
                                return (
                                    <tr key={data.id}>
                                        <td className="border-b border-l border-black dark:border-white py-5 text-center">
                                            <p className="text-black dark:text-white">{index + 1}</p>
                                        </td>
                                        <td className="border-b border-l border-black dark:border-white py-5 text-center">
                                            <p className="text-black dark:text-white">{data.nik}</p>
                                        </td>
                                        <td className="border-b border-l border-black dark:border-white py-5 text-center">
                                            <p className="text-black dark:text-white">{data.nama_pegawai}</p>
                                        </td>
                                        <td className="border-b border-l border-black dark:border-white py-5 text-center">
                                            <p className="text-black dark:text-white">{data.jabatan}</p>
                                        </td>
                                        <td className="border-b border-l border-black dark:border-white py-5 text-center">
                                            <p className="text-black dark:text-white">Rp. {data.gaji_pokok}</p>
                                        </td>
                                        <td className="border-b border-l border-black dark:border-white py-5 text-center">
                                            <p className="text-black dark:text-white">Rp. {data.tj_transport}</p>
                                        </td>
                                        <td className="border-b border-l border-black dark:border-white py-5 text-center">
                                            <p className="text-black dark:text-white">Rp. {data.uang_makan}</p>
                                        </td>
                                        <td className="border-b border-l border-black dark:border-white py-5 text-center">
                                            <p className="text-black dark:text-white">Rp. {data.potongan}</p>
                                        </td>
                                        <td className="border-b border-l border-r border-black dark:border-white py-5 text-center">
                                            <p className="text-black dark:text-white">Rp. {data.total}</p>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="py-6">
                    <div className="font-medium text-black text-right dark:text-white">
                        <span>Karawang, {`${new Date().getDate()} ${bulan} ${tahun}`}</span>
                        <br />
                        <span className="p-26">Finance</span>
                        <br />
                        <br />
                        <span className="p-8 italic text-black dark:text-white">Tanda Tangan</span>
                    </div>
                </div>
                <div className="italic text-black dark:text-white mt-40">
                    Dicetak Pada : {`${new Date().getDate()} ${bulan} ${tahun}`}
                </div>
            </div>
        </>
    );
};

export default PrintPdfDataGaji;
