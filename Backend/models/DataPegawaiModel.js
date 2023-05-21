import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const {DataTypes} = Sequelize;

const DataPegawai = db.define('data_pegawai', {
    id_pegawai:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    nik: {
        type: DataTypes.STRING(16),
        allowNull: false
    },
    nama_pegawai: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    username: {
        type: DataTypes.STRING(120),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING
    },
    jenis_kelamin: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    jabatan: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    tanggal_masuk: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    photo: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    url: DataTypes.STRING,
    hak_akses: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
});

export default DataPegawai;