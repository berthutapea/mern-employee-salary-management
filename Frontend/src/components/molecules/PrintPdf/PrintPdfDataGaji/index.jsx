import React, { useRef, useEffect, useState } from "react";
import Logo from "../../../../assets/images/logo/logo.svg";
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
            <div className="flex flex-col md:flex-row w-full gap-3 text-center p-6 bg-white">
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
            <div ref={componentRef} className="w-200% h-100% p-10 bg-white">
                <div className="flex items-center gap-25 object-cover border-b border-black">
                    <img className="w-30" src={Logo} alt="Logo" />
                    <h1 className="text-black text-3xl font-bold boder py-2">
                        PT. Humpuss Karbometil Selulosa
                    </h1>
                </div>
                <h1 className="text-center text-black my-4 text-xl font-medium boder py-2">
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
                                <th className="font-medium text-black border-b border-t border-l  border-black">
                                    No
                                </th>
                                <th className="font-medium text-black border-t border-l border-b border-black">
                                    NIK
                                </th>
                                <th className="font-medium text-black border-t border-l border-b border-black">
                                    Nama <br /> Pegawai
                                </th>
                                <th className="font-medium text-black border-t border-l border-b border-black">
                                    Jabatan
                                </th>
                                <th className="font-medium text-black border-t border-l border-b border-black">
                                    Gaji <br /> Pokok
                                </th>
                                <th className="font-medium text-black border-t border-l border-b border-black">
                                    Tunjangan <br />Transport
                                </th>
                                <th className="font-medium text-black border-t border-l border-b border-black">
                                    Uang <br /> Makan
                                </th>
                                <th className="font-medium text-black border-t border-l border-b border-black">
                                    Potongan
                                </th>
                                <th className="font-medium text-black border-t border-l border-b border-r border-black">
                                    Total <br /> Gaji
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataGaji.map((data, index) => {
                                return (
                                    <tr key={data.id}>
                                        <td className="border-b border-l  border-black py-5 text-center">
                                            <p className="text-black">{index + 1}</p>
                                        </td>
                                        <td className="border-b border-l  border-black py-5 text-center">
                                            <p className="text-black">{data.nik}</p>
                                        </td>
                                        <td className="border-b border-l border-black py-5 text-center">
                                            <p className="text-black">{data.nama_pegawai}</p>
                                        </td>
                                        <td className="border-b border-l border-black py-5 text-center">
                                            <p className="text-black">{data.jabatan}</p>
                                        </td>
                                        <td className="border-b border-l border-black py-5 text-center">
                                            <p className="text-black">Rp. {data.gaji_pokok}</p>
                                        </td>
                                        <td className="border-b border-l border-black py-5 text-center">
                                            <p className="text-black">Rp. {data.tj_transport}</p>
                                        </td>
                                        <td className="border-b border-l border-black py-5 text-center">
                                            <p className="text-black">Rp. {data.uang_makan}</p>
                                        </td>
                                        <td className="border-b border-l border-black py-5 text-center">
                                            <p className="text-black">Rp. {data.potongan}</p>
                                        </td>
                                        <td className="border-b border-l border-r border-black py-5 text-center">
                                            <p className="text-black">Rp. {data.total}</p>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="py-6">
                    <div className="font-medium w-full md:w-auto text-right text-black">
                        <span>Karawang, {`${new Date().getDate()} ${bulan} ${tahun}`}</span>
                        <br />
                        <br />
                        <span className="p-7">Tanda Tangan</span>
                        <br />
                        <br />
                        <span className="p-10">( Finance )</span>
                    </div>
                </div>
                <div className="italic text-black mt-40">
                    Dicetak Pada: {`${new Date().getDate()} ${bulan} ${tahun}`}
                </div>
            </div>
        </>
    );
};

export default PrintPdfDataGaji;
