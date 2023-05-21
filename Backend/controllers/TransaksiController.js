import DataKehadiran from "../models/DataKehadiranModel.js";
import DataPegawai from "../models/DataPegawaiModel.js";
import DataJabatan from "../models/DataJabatanModel.js";

/* TODO: POTONGAN_GAJI ()
1. View : NO, Potongan Gaji, Jumlah Potongan
2. Tambah Potongan : No, Potongan Gaji, Jumlah Potongan
3. Action: Simpan, Reset, Kembali */

// method untuk menampilkan semua Data Kehadiran
export const viewDataKehadiran = async(req, res) => {
    try {
        const dataKehadiran = await DataKehadiran.findAll({
            attributes: ['id', 'bulan', 'nik', 'nama_pegawai', 'jenis_kelamin', 'nama_jabatan', 'hadir', 'sakit', 'alpha']
        });
        res.json(dataKehadiran)
    } catch (error) {
        console.log(error);
    }
}

// method untuk menambah data kehadiran
export const createDataKehadiran = async (req, res) => {
    const { bulan, nik, nama_pegawai, jenis_kelamin, nama_jabatan, hadir, sakit, alpha } = req.body;

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
        await DataKehadiran.create({
            bulan: bulan,
            nik: nik,
            nama_pegawai: data_nama_pegawai.nama_pegawai,
            jenis_kelamin: jenis_kelamin,
            nama_jabatan: data_nama_jabatan.nama_jabatan,
            hadir: hadir,
            sakit: sakit,
            alpha: alpha
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
