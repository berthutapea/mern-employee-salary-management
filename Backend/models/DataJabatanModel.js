import { Sequelize } from 'sequelize';
import db from '../config/Database.js';
import DataPegawai from './DataPegawaiModel.js';

const {DataTypes} = Sequelize;

const DataJabatan = db.define('data_jabatan',{
        id_jabatan: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        nama_jabatan: {
            type: DataTypes.STRING(120),
            allowNull: false
        },
        gaji_pokok: {
            type: DataTypes.INTEGER(50),
            allowNull: false
        },
        tj_transport: {
            type: DataTypes.INTEGER(50),
            allowNull: false
        },
        uang_makan: {
            type: DataTypes.INTEGER(50)
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    },{
        freezeTableName: true
});

DataPegawai.hasMany(DataJabatan);
DataJabatan.belongsTo(DataPegawai, {foreignKey: 'userId'});

export default DataJabatan;