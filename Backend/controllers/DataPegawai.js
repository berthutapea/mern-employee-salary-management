import DataPegawai from "../models/DataPegawaiModel.js";
import argon2 from "argon2";
import path from "path";
import fs from "fs";

// menampilkan semua data Pegawai
export const getDataPegawai = async (req, res) => {
    try {
        const response = await DataPegawai.findAll({
            attributes: [
                'id','nik', 'nama_pegawai',
                'jenis_kelamin', 'jabatan', 'tanggal_masuk',
                'status', 'photo', 'hak_akses'
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

// method untuk mencari data Pegawai berdasarkan ID
export const getDataPegawaiByID = async (req, res) => {
    try {
        const response = await DataPegawai.findOne({
            attributes: [
                'id', 'nik', 'nama_pegawai',
                'jenis_kelamin', 'jabatan', 'tanggal_masuk',
                'status', 'photo', 'hak_akses'
            ],
            where: {
                id: req.params.id
            }
        });
        if(response){
            res.status(200).json(response);
        } else {
            res.status(404).json({msg:'Data pegawai dengan ID tersebut tidak ditemukan'})
        }
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

// TODO: method untuk mencari data pegawai berdasarkan NIK

// TODO: method untuk mencarai data pegawai berdasarkan Nama

//  method untuk tambah data Pegawai
export const createDataPegawai = async (req, res) => {
    const {
            nik, nama_pegawai,
            username, password, confPassword, jenis_kelamin,
            jabatan, tanggal_masuk,
            status, hak_akses
        } = req.body;

    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});

    if (req.files === null || req.files.photo === undefined) {
        return res.status(400).json({msg: "No File Uploaded"});
    }
    const file = req.files.photo;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png','.jpg','.jpeg'];

    if(!allowedType.includes(ext.toLocaleLowerCase())) return res.status(422).json({msg: "invalid Images"});

    if(fileSize > 2000000) return res.status(422).json({msg: "Image must be less than 2 MB"});

    file.mv(`./public/images/${fileName}`, async(err) => {
        if(err) return res.status(500).json({msg: err.message});
        const hashPassword = await argon2.hash(password);
        try {
            await DataPegawai.create({
                nik: nik,
                nama_pegawai: nama_pegawai,
                username: username,
                password: hashPassword,
                jenis_kelamin: jenis_kelamin,
                jabatan: jabatan,
                tanggal_masuk: tanggal_masuk,
                status: status,
                photo: fileName,
                url: url,
                hak_akses: hak_akses
            });
            res.status(201).json({msg: "Registrasi Berhasil"});
        } catch (error) {
            console.log(error.message);
        }
    })
}

// method untuk update data Pegawai
export const updateDataPegawai = async (req, res) => {
    const pegawai = await DataPegawai.findOne({
        where: {
            id: req.params.id
        }
    });

    if (!pegawai) return res.staus(404).json({msg: "Data pegawai tidak ditemukan"});
    const {
            nik, nama_pegawai,
            username, password, confPassword, jenis_kelamin,
            jabatan, tanggal_masuk,
            status, hak_akses
        } = req.body;

    let fileName = "";
    if(req.files === null){
        fileName = pegawai.photo;
    }else{
        const file = req.files.photo;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png', '.jpg', 'jpeg'];

        if(!allowedType.includes(ext.toLocaleLowerCase())) return res.status(422).json({msg: "invalid Images"});

        if(fileSize > 2000000) return res.status(422).json({msg: "Image must be less than 2 MB"});

        const filepath = `./public/images/${pegawai.photo}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/images/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message});
        });
    }

    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    let hashPassword;
    if(password === "" || password === null){
        hashPassword = pegawai.password
    }else{
        hashPassword = await argon2.hash(password);
    }
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    try {
        await DataPegawai.update({
            nik: nik,
            nama_pegawai: nama_pegawai,
            username: username,
            password: hashPassword,
            jenis_kelamin: jenis_kelamin,
            jabatan: jabatan,
            tanggal_masuk: tanggal_masuk,
            status: status,
            photo: fileName,
            url: url,
            hak_akses: hak_akses
        }, {
            where: {
                id: pegawai.id
            }
        });
        res.status(200).json({msg: "Data Pegawai Updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

// method untuk delete data Pegawai
export const deleteDataPegawai = async (req, res) => {
    const pegawai = await DataPegawai.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!pegawai) return res.status(404).json({msg:"Data Pegawai tidak ditemukan"});
    try {
        await DataPegawai.destroy({
            where:{
                id: pegawai.id
            }
        });
        res.status(200).json({msg: "Data Pegawai Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}