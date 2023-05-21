import DataPegawai from "../models/DataPegawaiModel.js";
import argon2 from "argon2";

export const Login = async (req, res) =>{
    const pegawai = await DataPegawai.findOne({
        where: {
            username: req.body.username
        }
    });
    if(!pegawai) return res.status(404).json({msg: "Data Pegawai tidak ditemukan"});

    const match = await argon2.verify(pegawai.password, req.body.password);
    if(!match) return res.status(400).json({msg: "Wrong Password"});
    req.session.userId = pegawai.id_pegawai;

    const id_pegawai = pegawai.id;
    const nama_pegawai = pegawai.nama_pegawai;
    const username = pegawai.username;
    const hak_akses = pegawai.hak_akses;
    res.status(200).json({id_pegawai, nama_pegawai, username, hak_akses});
}

export const Me = async (req, res) => {
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon login ke akun Anda!"});
    }
    const pegawai = await DataPegawai.findOne({
        attributes: ['id', 'nama_pegawai', 'username', 'hak_akses'],
        where: {
            id_pegawai: req.session.userId
        }
    });
    if(!pegawai) return res.status(404).json({msg: "User tidak ditemukan"});
    res.status(200).json(pegawai);
}

export const LogOut = (req, res) =>{
    req.session.destroy((err) =>{
        if(err) return res.status(400).json({msg: "Tidak dapat logout"});
        res.status(200).json({msg: "Anda telah logout"});
    });
}
