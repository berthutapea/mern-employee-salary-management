import DataKehadiran from "../models/DataKehadiranModel.js";
import DataPegawai from "../models/DataPegawaiModel.js";
import DataJabatan from "../models/DataJabatanModel.js";
import PotonganGaji from "../models/PotonganGajiModel.js";

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
        // console.log(dataKehadiran)
    } catch (error) {
        console.log(error);
    }
}

// viewDataKehadiran();

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

    if (!nama_sudah_ada){
        const month = new Date().toLocaleString('default', { month: 'long' });
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
export const getDataPegawai = async() => {
    try {
        // get data pegawai :
        const data_pegawai = await DataPegawai.findAll({
            attributes: [
                'id_pegawai',
                'nik',
                'nama_pegawai',
                'jenis_kelamin',
                'jabatan'
            ],
            distinct: true
        });

        const resultDataPegawai = [];

        data_pegawai.forEach(({ nik, nama_pegawai, jenis_kelamin, jabatan }) => {
            const objek_data_pegawai = {
                nik,
                nama_pegawai,
                jenis_kelamin,
                jabatan,
            };

            const index = resultDataPegawai.length;

            resultDataPegawai[index] = objek_data_pegawai;
        });

        // dataPegawai :
        const dataPegawai = resultDataPegawai.map((value)=>{
            const nik = value.nik
            const nama_pegawai = value.nama_pegawai
            const jenis_kelamin = value.jenis_kelamin
            const jabatan_pegawai = value.jabatan

            return { nik, nama_pegawai, jenis_kelamin, jabatan_pegawai};
        });

        const dataTiapPegawai = [];
        dataPegawai.forEach((pegawai) => {
            const { nik, nama_pegawai, jenis_kelamin, jabatan_pegawai } = pegawai;

            dataTiapPegawai.push({
                nik, nama_pegawai, jenis_kelamin, jabatan_pegawai
            });
        });
        return dataTiapPegawai;
    } catch (error) {
        console.error(error);
    }
}

// method untuk mengambil data jabatan :
export const getDataJabatan = async() => {
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

        const resultDataJabatan = [];

        data_jabatan.forEach(({
            nama_jabatan,
            gaji_pokok,
            tj_transport,
            uang_makan
        }) => {
            const objek_data_jabatan = {
                nama_jabatan,
                gaji_pokok,
                tj_transport,
                uang_makan
            };

            const index = resultDataJabatan.length;
            resultDataJabatan[index] = objek_data_jabatan;
        });

        // dataJabatan
        const dataJabatan = resultDataJabatan.map((value)=>{
            const nama_jabatan = value.nama_jabatan
            const gaji_pokok = value.gaji_pokok
            const tj_transport = value.tj_transport
            const uang_makan = value.uang_makan

            return {nama_jabatan, gaji_pokok, tj_transport, uang_makan}
        });

        const dataTiapJabatan = [];
        dataJabatan.forEach((jabatan) => {
            const {
                nama_jabatan,
                gaji_pokok,
                tj_transport,
                uang_makan
            } = jabatan;

            dataTiapJabatan.push({
                nama_jabatan,
                gaji_pokok,
                tj_transport,
                uang_makan
            });
        });
        return dataTiapJabatan;
    } catch (error) {
        console.error(error);
    }
}

// method untuk mengambil data kehadiran :
export const getDataKehadiran = async () => {
    try {
        // Get data kehadiran
        const data_Kehadiran = await DataKehadiran.findAll({
            attributes: [
                'id','bulan', 'nik',
                'nama_pegawai', 'jenis_kelamin',
                'nama_jabatan', 'hadir',
                'sakit', 'alpha', 'createdAt'
            ],
            distinct: true
        });

        const resultDataKehadiran = [];

        data_Kehadiran.forEach(({
            id, bulan, nik,
            nama_pegawai, jenis_kelamin,
            nama_jabatan, hadir,
            sakit, alpha, createdAt
        })=> {
            const objek_data_kehadiran = {
                id,
                bulan,
                nik,
                nama_pegawai,
                jenis_kelamin,
                nama_jabatan,
                hadir,
                sakit,
                alpha,
                createdAt
            };
            const index = resultDataKehadiran.length;
            resultDataKehadiran[index] = objek_data_kehadiran;
        });

        // dataKehadiran
        const dataKehadiran = resultDataKehadiran.map((value)=>{
            const bulan = value.bulan
            const nik = value.nik
            const nama_pegawai = value.nama_pegawai
            const jenis_kelamin = value.jenis_kelamin
            const nama_jabatan = value.nama_jabatan
            const hadir = value.hadir
            const sakit = value.sakit
            const alpha = value.alpha
            const tahun = value.createdAt

            return {
                bulan, nik, nama_pegawai,
                jenis_kelamin, nama_jabatan,
                hadir, sakit, alpha, tahun
            }
        });

        const dataKehadiranPegawai = [];
        dataKehadiran.forEach((kehadiran) => {
            const {
                    bulan, nik, nama_pegawai,
                    jenis_kelamin, nama_jabatan,
                    hadir, sakit, alpha, tahun
                    } = kehadiran;

            dataKehadiranPegawai.push({
                bulan, nik, nama_pegawai,
                jenis_kelamin, nama_jabatan,
                hadir, sakit, alpha, tahun
            });
        });
        return dataKehadiranPegawai;
    } catch (error) {
        console.error(error);
    }
}

export const getDataPotongan = async () => {
    try {
        // get data potongan :
        const data_potongan = await PotonganGaji.findAll({
            attributes: ['id','potongan', 'jml_potongan'],
            distinct: true
        });

        const resultDataPotongan = [];

        data_potongan.forEach(({id, potongan, jml_potongan})=> {
            const objek_data_potongan = {
                id,
                potongan,
                jml_potongan
            };
            const index = resultDataPotongan.length;
            resultDataPotongan[index] = objek_data_potongan;
        });

        // dataPotongan
        const dataPotongan = resultDataPotongan.map((value)=>{
            const id = value.id
            const potongan = value.potongan
            const jml_potongan = value.jml_potongan

            return {id, potongan, jml_potongan}
        });

        const dataPotonganPegawai = [];
        dataPotongan.forEach((potonganPegawai) => {
            const { id, potongan, jml_potongan } = potonganPegawai;

            dataPotonganPegawai.push({ id, potongan, jml_potongan });
        });
        return dataPotonganPegawai;
    } catch (error) {
        console.error(error);
    }
};

// Logika matematika
export const getDataGajiPegawai = async () => {
    try {
        const dataPegawai = await getDataPegawai();
        const data_pegawai = dataPegawai.map((pegawai) => ({
            nik: pegawai.nik,
            nama_pegawai : pegawai.nama_pegawai,
            jenis_kelamin: pegawai.jenis_kelamin,
            jabatan_pegawai : pegawai.jabatan_pegawai
        }));

        const dataJabatan = await getDataJabatan();
        const data_jabatan = dataJabatan.map((jabatan) => ({
            nama_jabatan : jabatan.nama_jabatan,
            gaji_pokok: jabatan.gaji_pokok,
            tj_transport: jabatan.tj_transport,
            uang_makan: jabatan.uang_makan
        }));

        const dataKehadiran = await getDataKehadiran();
        const data_kehadiran = dataKehadiran.map((kehadiran) => {
            return {
                bulan: kehadiran.bulan,
                nama_pegawai : kehadiran.nama_pegawai,
                hadir : kehadiran.hadir,
                sakit : kehadiran.sakit,
                alpha : kehadiran.alpha,
                nama_jabatan : kehadiran.nama_jabatan,
                tahun : kehadiran.tahun
            }
        });
        console.log(data_kehadiran)

        const dataPotongan = await getDataPotongan();
        const data_potongan = dataPotongan.map((potongan) => ({
            potongan: potongan.potongan,
            jml_potongan : potongan.jml_potongan,
        }));

        const resultArray = data_pegawai.map((pegawai) => {
            const matchedJabatan = data_jabatan.find(
                (jabatan) => pegawai.jabatan_pegawai === jabatan.nama_jabatan
            );
            const matchedKehadiran = data_kehadiran.find(
                (kehadiran) => pegawai.nama_pegawai === kehadiran.nama_pegawai
            );
            console.log(matchedKehadiran)

            return {
                nik: pegawai.nik,
                nama_pegawai: pegawai.nama_pegawai,
                jenis_kelamin: pegawai.jenis_kelamin,
                jabatan_pegawai: pegawai.jabatan_pegawai,
                gaji_pokok: matchedJabatan.gaji_pokok,
                tj_transport: matchedJabatan.tj_transport,
                uang_makan: matchedJabatan.uang_makan,
                hadir: matchedKehadiran.hadir, // <---- Perbaiki Error ini.
                sakit: matchedKehadiran.sakit,
                alpha: matchedKehadiran.alpha
                };
            });

        /* checking kehadiran */
        const resultArray2 = resultArray.map((data_pegawai) => {
            const matchedHadir = data_kehadiran.find((hadir) => data_pegawai.hadir === hadir.hadir);

            const matchedAlpha = data_kehadiran.find((alpha) => data_pegawai.alpha === alpha.alpha);

            return {
                nama_pegawai: data_pegawai.nama_pegawai,
                hadir: matchedHadir.hadir,
                alpha: matchedAlpha.alpha
            }
        });

        /* Potongan */
        resultArray2.forEach((pegawai) => {
            const matchedPotongan = data_potongan.find((potongan) => potongan.potongan === 'alpha');
            const potonganAlpha = matchedPotongan.jml_potongan * pegawai.alpha;

            pegawai.potongan = potonganAlpha;
        });

    /* Result Akhir */
        const resultArray3 = resultArray2.map((pegawai2) => {
            const pegawai = resultArray.find((pegawai) => pegawai.nama_pegawai === pegawai2.nama_pegawai);
            const totalGajiPegawai = (pegawai.gaji_pokok + pegawai.tj_transport + pegawai.uang_makan) - pegawai2.potongan;
            const kehadiran = data_kehadiran.find((kehadiran) => kehadiran.nama_pegawai === pegawai2.nama_pegawai);
            const periode = kehadiran ? new Date(kehadiran.tahun).toLocaleString('default', { year: 'numeric', month: 'long', day: 'numeric' }) : null;
            return {
                nik: pegawai.nik,
                nama_pegawai: pegawai.nama_pegawai,
                jenis_kelamin: pegawai.jenis_kelamin,
                jabatan_pegawai: pegawai.jabatan_pegawai,
                gaji_pokok: pegawai.gaji_pokok,
                tj_transport: pegawai.tj_transport,
                uang_makan: pegawai.uang_makan,
                potongan: pegawai2.potongan,
                total_gaji: totalGajiPegawai,
                periode: periode
            };
        });
        return resultArray3;
    } catch (error) {
        console.error(error);
    }
};


// method untuk melihat data gaji pegawai
export const viewDataGajiPegawai = async (req, res) => {
    try {
        const dataGajiPegawai = await getDataGajiPegawai();
        console.log(dataGajiPegawai);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error'});
    }
};

viewDataGajiPegawai()

/* TODO: Belum selesai  */
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
    })
    const dataGajiByMonth = dataGajiPegawai.map((data_gaji) => {
        return {
            bulan: response,
            nik: data_gaji.nik,
            nama_pegawai: data_gaji.nama_pegawai,
            jenis_kelamin: data_gaji.jenis_kelamin,
            jabatan_pegawai: data_gaji.jabatan_pegawai,
            gaji_pokok: data_gaji.gaji_pokok,
            tj_transport: data_gaji.tj_transport,
            uang_makan: data_gaji.uang_makan,
            potongan: data_gaji.potongan,
            total_gaji: data_gaji.total_gaji,
        };
    });
    res.json(dataGajiByMonth)
    console.log()
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
};