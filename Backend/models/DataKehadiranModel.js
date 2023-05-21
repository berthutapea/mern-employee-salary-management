import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const {DataTypes} = Sequelize;

const DataKehadiran = db.define('data_kehadiran',{
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        bulan: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        nik: {
            type: DataTypes.STRING(16),
            allowNull: false
        },
        nama_pegawai: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        jenis_kelamin: {
            type: DataTypes.STRING(20)
        },
        nama_jabatan: {
            type: DataTypes.STRING(50)
        },
        hadir: {
            type: DataTypes.INTEGER(11)
        },
        sakit: {
            type: DataTypes.INTEGER(11)
        },
        alpha: {
            type: DataTypes.INTEGER(11)
        },
    },{freezeTableName: true});

export default DataKehadiran