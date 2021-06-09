const Sequelize = require('sequelize');

module.exports = class MOTIE_DATA_REQUEST extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            type: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            gubun: {
                type: Sequelize.STRING(50),
                allowNull: false,
                defaultValue: '\'\'',
            },
            powerGenId: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            unitId: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            makeId: {
                type: Sequelize.STRING(50),
                allowNull: true,
                defaultValue: '\'\'',
            },
            deviceId: {
                type: Sequelize.STRING(50),
                allowNull: true,
                defaultValue: '\'\'',
            },
            startTime: {
                type: Sequelize.STRING(50),
                allowNull: false,
                defaultValue: '\'\'',
            },
            endTime: {
                type: Sequelize.STRING(50),
                allowNull: false,
                defaultValue: '\'\'',
            },
            state: {
                type: Sequelize.STRING(50),
                allowNull: false,
                defaultValue: '200',
            },
            stateValue: {
                type: Sequelize.STRING(50),
                allowNull: false,
                defaultValue: '200',
            },
            fstUser: {
                type: Sequelize.STRING(50),
                allowNull: false,
                defaultValue: '\'\'',
            },
            fstDttm: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            stationId: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'MOTIE_DATA_REQUEST',
            tableName: 'motie_data_request',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};