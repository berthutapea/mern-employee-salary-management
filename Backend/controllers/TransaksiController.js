import DataKehadiran from "../models/DataKehadiranModel.js";
import DataPegawai from "../models/DataPegawaiModel.js";
import DataJabatan from "../models/DataJabatanModel.js";
import PotonganGaji from "../models/PotonganGajiModel.js";
import moment from 'moment';
import 'moment/locale/id.js';

// method untuk menampilkan semua Data Kehadiran
export const viewDataKehadiran = async(req, res) => {
    try {
        const dataKehadiran = await DataKehadiran.findAll({
            attributes: [
                'id', 'bulan', 'nik',
                'nama_pegawai', 'jenis_kelamin',
                'nama_jabatan', 'hadir',
                'sakit', 'alpha', 'createdAt'
            ]
        });
        res.json(dataKehadiran);
    } catch (error) {
        console.log(error);
    }
}

// method untuk menambah data kehadiran
export const createDataKehadiran = async (req, res) => {
    const {
        nik, nama_pegawai,
        jenis_kelamin, nama_jabatan,
        hadir, sakit, alpha
    } = req.body;

    try {
        const data_nama_pegawai = await DataPegawai.findOne({
            where: {
                nama_pegawai: nama_pegawai
            }
        });

        const data_nama_jabatan = await DataJabatan.findOne({
            where: {
                nama_jabatan: nama_jabatan
            }
        });

        const data_nik_pegawai = await DataPegawai.findOne({
            where: {
                nik: nik
            }
        });

        const nama_sudah_ada = await DataKehadiran.findOne({
            where: {
                nama_pegawai: nama_pegawai
            }
        });

    if (!data_nama_pegawai) {
        return res.status(404).json({ msg: "Data nama pegawai tidak ditemukan" });
    }

    if (!data_nama_jabatan){
        return res.status(404).json({msg: "Data nama jabatan tidak ditemukan"});
    }

    if (!data_nik_pegawai){
        return res.status(404).json({msg: "Data nik tidak ditemukan"});
    }

    if (!nama_sudah_ada) {
        const month = moment().locale('id').format('MMMM');
        await DataKehadiran.create({
            bulan: month,
            nik: nik,
            nama_pegawai: data_nama_pegawai.nama_pegawai,
            jenis_kelamin: jenis_kelamin,
            nama_jabatan: data_nama_jabatan.nama_jabatan,
            hadir: hadir,
            sakit: sakit,
            alpha: alpha,
        });
        res.json({ msg: "Tambah Data Kehadiran Berhasil" });
    } else {
        res.status(400).json({msg: "Data nama sudah ada"});
    }
    } catch (error) {
        console.log(error);
    }
}

// method untuk update data kehadiran
export const updateDataKehadiran = async (req, res) => {
    try {
        await DataKehadiran.update(req.body,{
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({message: "Data kehadiran berhasil diupdate"});
    } catch (error) {
        console.log(error.message);
    }
}

// method untuk delete data kehadiran
export const deleteDataKehadiran = async (req, res) => {
    try {
        await DataKehadiran.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({message: "Delete data berhasil"});
    } catch (error) {
        console.log(error.message);
    }
}

// method untuk create data potongan gaji
export const createDataPotonganGaji = async(req, res) =>{
    const {id, potongan, jml_potongan} = req.body;
    try {
        const nama_potongan = await PotonganGaji.findOne({
            where: {
                potongan : potongan
            }
        });
        if (nama_potongan){
            res.status(400).json({msg: "Data potongan sudah ada !"});
        }else{
            await PotonganGaji.create({
                id: id,
                potongan: potongan,
                jml_potongan: jml_potongan
            });
            res.json({msg:"Tambah Data Potongan Gaji Berhasil"});
        }
    } catch (error) {
        console.log(error);
    }
}

// method untuk menampilkan semua Data Potongan
export const viewDataPotongan = async(req, res) => {
    try {
        const dataPotongan = await PotonganGaji.findAll({
            attributes: ['id', 'potongan', 'jml_potongan']
        });
        res.json(dataPotongan)
    } catch (error) {
        console.log(error);
    }
}

// method untuk update Data Potongan
export const updateDataPotongan = async (req, res) => {
    try {
        await PotonganGaji.update(req.body,{
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({message: "Data Potongan berhasil diupdate"});
    } catch (error) {
        console.log(error.message);
    }
}

// method untuk delete data potongan
export const deleteDataPotongan = async (req, res) => {
    try {
        await PotonganGaji.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({message: "Delete data berhasil"});
    } catch (error) {
        console.log(error.message);
    }
}

// method untuk mengambil data gaji pegawai (data pegawai + data jabatan + data kehadiran + data potongan)

// method untuk mengambil data pegawai :
export const getDataPegawai = async () => {
    let resultDataPegawai = [];

    try {
        // Get data pegawai:
        const data_pegawai = await DataPegawai.findAll({
            attributes: [
                'nik',
                'nama_pegawai',
                'jenis_kelamin',
                'jabatan'
            ],
            distinct: true
        });

        resultDataPegawai = data_pegawai.map((pegawai) => {
            const nik = pegawai.nik;
            const nama_pegawai = pegawai.nama_pegawai;
            const jenis_kelamin = pegawai.jenis_kelamin;
            const jabatan_pegawai = pegawai.jabatan;

            return { nik, nama_pegawai, jenis_kelamin, jabatan_pegawai };
        });
    } catch (error) {
        console.error(error);
    }

    return resultDataPegawai;
};

// method untuk mengambil data jabatan :
export const getDataJabatan = async() => {
    let resultDataJabatan = [];
    try {
        // get data jabatan :
        const data_jabatan = await DataJabatan.findAll({
            attributes: [
                'nama_jabatan',
                'gaji_pokok',
                'tj_transport',
                'uang_makan'
            ],
            distinct: true
        });

        resultDataJabatan = data_jabatan.map((jabatan) => {
            const nama_jabatan = jabatan.nama_jabatan
            const gaji_pokok = jabatan.gaji_pokok
            const tj_transport = jabatan.tj_transport
            const uang_makan = jabatan.uang_makan

            return { nama_jabatan, gaji_pokok, tj_transport, uang_makan }
        });
    } catch (error) {
        console.error(error);
    }
    return resultDataJabatan;
}

// method untuk mengambil data kehadiran :
export const getDataKehadiran = async () => {
    let resultDataKehadiran = [];
    try {
        // Get data kehadiran
        const data_Kehadiran = await DataKehadiran.findAll({
            attributes: [
                'bulan', 'nik',
                'nama_pegawai', 'jenis_kelamin',
                'nama_jabatan', 'hadir',
                'sakit', 'alpha', 'createdAt'
            ],
            distinct: true
        });

        resultDataKehadiran = data_Kehadiran.map((kehadiran) => {
            const createdAt = new Date(kehadiran.createdAt);
            const year = createdAt.getFullYear();
            const bulan = kehadiran.bulan;
            const nama_pegawai = kehadiran.nama_pegawai;
            const jabatan_pegawai = kehadiran.nama_jabatan;
            const hadir = kehadiran.hadir;
            const sakit = kehadiran.sakit;
            const alpha = kehadiran.alpha;

            return {bulan, year, nama_pegawai, jabatan_pegawai, hadir, sakit, alpha}
        });
    } catch (error) {
        console.error(error);
    }
    return resultDataKehadiran;
}

export const getDataPotongan = async () => {
    let resultDataPotongan = [];
    try {
        // get data potongan :
        const data_potongan = await PotonganGaji.findAll({
            attributes: ['id','potongan', 'jml_potongan'],
            distinct: true
        });
        resultDataPotongan = data_potongan.map((potongan) => {
            const id = potongan.id;
            const nama_potongan = potongan.potongan;
            const jml_potongan = potongan.jml_potongan;

            return {id, nama_potongan, jml_potongan}
        })
    } catch (error) {
        console.error(error);
    }
    return resultDataPotongan;
};

// Logika matematika
export const getDataGajiPegawai = async () => {
    try {
        // Gaji Pegawai :
        const resultDataPegawai = await getDataPegawai();
        const resultDataJabatan = await getDataJabatan();

        const gaji_pegawai = resultDataPegawai.filter((pegawai) => resultDataJabatan.some((jabatan) => jabatan.nama_jabatan === pegawai.jabatan_pegawai)
        ).map((pegawai) => {
            const jabatan = resultDataJabatan.find((jabatan) => jabatan.nama_jabatan === pegawai.jabatan_pegawai);
            return {
                nama_pegawai: pegawai.nama_pegawai,
                jabatan: pegawai.jabatan_pegawai,
                gaji_pokok: jabatan.gaji_pokok,
                tj_transport: jabatan.tj_transport,
                uang_makan: jabatan.uang_makan
            }
        })

        // Potongan Pegawai :
        const resultDataKehadiran = await getDataKehadiran();
        const resultDataPotongan = await getDataPotongan();

        const potongan_pegawai = resultDataKehadiran.filter((kehadiran) =>
            kehadiran.alpha > 0 && resultDataPotongan.some((potongan) => potongan.nama_potongan === 'alpha')).map((kehadiran) => {
                const potongan_alpha = resultDataPotongan.find((potongan) => potongan.nama_potongan === 'alpha');
                const jml_potongan = potongan_alpha.jml_potongan;

                return {
                    tahun: kehadiran.year,
                    bulan: kehadiran.bulan,
                    nama_pegawai: kehadiran.nama_pegawai,
                    hadir: kehadiran.hadir,
                    sakit: kehadiran.sakit,
                    alpha: kehadiran.alpha,
                    total_potongan: kehadiran.alpha * jml_potongan
                }
            })

        // Total Gaji Pegawai :
        const total_gaji_pegawai = gaji_pegawai.map((pegawai) => {
            const potongan = potongan_pegawai.find((potongan) => potongan.nama_pegawai === pegawai.nama_pegawai);
            const total_gaji = (pegawai.gaji_pokok + pegawai.tj_transport + pegawai.uang_makan) - (potongan ? potongan.total_potongan : 0);

            return {
                tahun: potongan ? potongan.tahun : 0,
                bulan: potongan ? potongan.bulan : '',
                nama_pegawai: pegawai.nama_pegawai,
                jabatan: pegawai.jabatan,
                gaji_pokok: pegawai.gaji_pokok,
                tj_transport: pegawai.tj_transport,
                uang_makan: pegawai.uang_makan,
                potongan: potongan ? potongan.total_potongan : 0,
                total: total_gaji
            };
        });
        return total_gaji_pegawai;
    } catch (error) {
        console.error(error);
    }
};


// method untuk melihat data gaji pegawai
export const viewDataGajiPegawai = async (req, res) => {
    try {
        const dataGajiPegawai = await getDataGajiPegawai();
        res.status(200).json(dataGajiPegawai);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error'});
    }
};

// method untuk melihat data gaji pegawai berdasarkan nama
export const viewDataGajiPegawaiByName = async (req, res) => {
    try {
        const dataGajiPegawai = await getDataGajiPegawai();
        const { name } = req.params;

        const dataGajiByName = dataGajiPegawai.filter((data_gaji) => {
            return data_gaji.nama_pegawai.toLowerCase().includes(name.toLowerCase());
        }).map((data_gaji) => {
            return {
                tahun: data_gaji.tahun,
                nik: data_gaji.nik,
                nama_pegawai: data_gaji.nama_pegawai,
                jenis_kelamin: data_gaji.jenis_kelamin,
                jabatan_pegawai: data_gaji.jabatan_pegawai,
                gaji_pokok: data_gaji.gaji_pokok,
                tj_transport: data_gaji.tj_transport,
                uang_makan: data_gaji.uang_makan,
                potongan: data_gaji.potongan,
                total_gaji: data_gaji.total,
            };
        });

        if (dataGajiByName.length === 0) {
            return res.status(404).json({ msg: 'Data tidak ditemukan' });
        }
        res.json(dataGajiByName);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// method untuk mencari data gaji pegawai berdasarkan bulan
export const viewDataGajiPegawaiByMonth = async (req, res) => {
    try {
        const dataGajiPegawai = await getDataGajiPegawai();
        const response = await DataKehadiran.findOne({
            attributes: [
                'bulan'
            ],
            where: {
                bulan: req.params.month
            }
        });

        if (response) {
            const dataGajiByMonth = dataGajiPegawai.filter((data_gaji) => {
                return data_gaji.bulan === response.bulan;
            }).map((data_gaji) => {
                return {
                    response,
                    nik: data_gaji.nik,
                    nama_pegawai: data_gaji.nama_pegawai,
                    jenis_kelamin: data_gaji.jenis_kelamin,
                    jabatan_pegawai: data_gaji.jabatan_pegawai,
                    gaji_pokok: data_gaji.gaji_pokok,
                    tj_transport: data_gaji.tj_transport,
                    uang_makan: data_gaji.uang_makan,
                    potongan: data_gaji.potongan,
                    total_gaji: data_gaji.total,
                };
            });

            if (dataGajiByMonth.length === 0) {
                return res.status(404).json({ msg: `Data untuk bulan ${req.params.month} tidak ditemukan` });
            }

            res.json(dataGajiByMonth);
        } else {
            res.status(404).json({ msg: `Data untuk bulan ${req.params.month} tidak ditemukan` });
        }
    } catch (error) {
        res.status(500).json({ error: 'Kesalahan Server Internal' });
    }
};


// method untuk mencari data gaji pegawai berdasarkan tahun
export const viewDataGajiPegawaiByYear = async (req, res) => {
    try {
        const dataGajiPegawai = await getDataGajiPegawai();
        const { year } = req.params;

        const dataGajiByYear = dataGajiPegawai.filter((data_gaji) => {
            const gajiYear = data_gaji.tahun;
            return gajiYear === parseInt(year);
        }).map((data_gaji) => {
            return {
                tahun: data_gaji.tahun,
                nik: data_gaji.nik,
                nama_pegawai: data_gaji.nama_pegawai,
                jenis_kelamin: data_gaji.jenis_kelamin,
                jabatan_pegawai: data_gaji.jabatan_pegawai,
                gaji_pokok: data_gaji.gaji_pokok,
                tj_transport: data_gaji.tj_transport,
                uang_makan: data_gaji.uang_makan,
                potongan: data_gaji.potongan,
                total_gaji: data_gaji.total,
            };
        });

        if (dataGajiByYear.length === 0) {
            return res.status(404).json({ msg: 'Data tidak ditemukan' });
        }
        res.json(dataGajiByYear);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
