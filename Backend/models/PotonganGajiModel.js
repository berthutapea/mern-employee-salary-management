import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const {DataTypes} = Sequelize;

const PotonganGaji = db.define('potongan_gaji',{
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        potongan: {
            type: DataTypes.STRING(120),
            allowNull: false
        },
        jml_potongan: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        }
    },{freezeTableName: true
});

export default PotonganGaji;