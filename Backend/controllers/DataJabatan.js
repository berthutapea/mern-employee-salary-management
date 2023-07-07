import DataJabatan from "../models/DataJabatanModel.js";
import DataPegawai from "../models/DataPegawaiModel.js";
import { Op } from "sequelize";

// menampilkan semua data jabatan
export const getDataJabatan = async (req, res) => {
    try {
        let response;
        if (req.hak_akses === "admin") {
            response = await DataJabatan.findAll({
                attributes: ['id', 'nama_jabatan', 'gaji_pokok', 'tj_transport', 'uang_makan'],
                include: [{
                    model: DataPegawai,
                    attributes: ['nama_pegawai', 'username', 'hak_akses'],
                }]
            });
        } else {
            if (req.userId !== DataJabatan.userId) return res.status(403).json({ msg: "Akses terlarang" });
            await DataJabatan.update({
                nama_jabatan, gaji_pokok, tj_transport, uang_makan
            }, {
                where: {
                    [Op.and]: [{ id_jabatan: jabatan.id_jabatan }, { userId: req.userId }]
                },
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// method untuk menampilkan data jabatan by ID
export const getDataJabatanByID = async (req, res) => {
    try {
        const response = await DataJabatan.findOne({
            attributes: [
                'id','nama_jabatan', 'gaji_pokok', 'tj_transport', 'uang_makan'
            ],
            where: {
                id: req.params.id
            }
        });
        if(response){
            res.status(200).json(response);
        }else{
            res.status(404).json({msg: 'Data jabatan dengan ID tersebut tidak ditemukan'});
        }
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

// method untuk tambah data jabatan
export const createDataJabatan = async (req, res) => {
    const {
        id_jabatan, nama_jabatan, gaji_pokok, tj_transport, uang_makan
    } = req.body;
    try {
        if (req.hak_akses === "admin") {
            await DataJabatan.create({
                id_jabatan: id_jabatan,
                nama_jabatan: nama_jabatan,
                gaji_pokok: gaji_pokok,
                tj_transport: tj_transport,
                uang_makan: uang_makan,
                userId: req.userId
            });
        } else {
            if (req.userId !== DataJabatan.userId) return res.status(403).json({ msg: "Akses terlarang" });
            await DataJabatan.update({
                nama_jabatan, gaji_pokok, tj_transport, uang_makan
            }, {
                where: {
                    [Op.and]: [{ id_jabatan: jabatan.id_jabatan }, { userId: req.userId }]
                },
            });
        }
        res.status(201).json({ success: true, message: "Data Jabatan Berhasil di Simpan" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }

}

// method untuk update data jabatan
export const updateDataJabatan = async (req, res) => {
    try {
        const jabatan = await DataJabatan.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!jabatan) return res.status(404).json({ msg: "Data tidak ditemukan" });
        const { nama_jabatan, gaji_pokok, tj_transport, uang_makan } = req.body;
        if (req.hak_akses === "admin") {
            await DataJabatan.update({
                nama_jabatan, gaji_pokok, tj_transport, uang_makan
            }, {
                where: {
                    id: jabatan.id
                }
            });
        } else {
            if (req.userId !== DataJabatan.userId) return res.status(403).json({ msg: "Akses terlarang" });
            await DataJabatan.update({
                nama_jabatan, gaji_pokok, tj_transport, uang_makan
            }, {
                where: {
                    [Op.and]: [{ id_jabatan: jabatan.id_jabatan }, { userId: req.userId }]
                },
            });
        }
        res.status(200).json({ msg: "Data Jabatan Berhasil di Pebarui" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// method untuk delete data jabatan
export const deleteDataJabatan = async (req, res) => {
    try {
        const jabatan = await DataJabatan.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!jabatan) return res.status(404).json({ msg: "Data tidak ditemukan" });
        if (req.hak_akses === "admin") {
            await jabatan.destroy({
                where: {
                    id: jabatan.id
                }
            });
        } else {
            if (req.userId !== jabatan.userId) return res.status(403).json({ msg: "Akses terlarang" });
            await jabatan.destroy({
                where: {
                    [Op.and]: [{ id_jabatan: jabatan.id_jabatan }, { userId: req.userId }]
                },
            });
        }
        res.status(200).json({ msg: "Data Jabatan Berhasil di Hapus" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }

}