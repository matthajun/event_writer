const Sequelize = require('sequelize');

module.exports = class COMMUNI_WHITE_LIST extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
            },
            stationId: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            powerGenId: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            unit: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            make: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            protocolType: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            detailProtocol: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            srcIp: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            dstIp: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            srcPort: {
                type: Sequelize.STRING(45),
                allowNull: true,
            },
            dstPort: {
                type: Sequelize.STRING(45),
                allowNull: true,
            },
            state: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            fstDttm: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            lstDttm: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            fstUser: {
                type: Sequelize.STRING(60),
                allowNull: true,
            },
            lstUser: {
                type: Sequelize.STRING(60),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'COMMUNI_WHITE_LIST',
            tableName: 'communi_white_list',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};