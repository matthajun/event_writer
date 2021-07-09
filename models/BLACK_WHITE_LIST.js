const Sequelize = require('sequelize');

module.exports = class BLACK_WHITE_LIST extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
            },
            type: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: true,
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
            port: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ip: {
                type: Sequelize.STRING(45),
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
            state: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            trans_tag: {
                type: Sequelize.STRING(5),
                allowNull: false,
                defaultValue: 'C',
            },
            deploy: {
                type: Sequelize.STRING(50),
                allowNull: false,
                defaultValue: 'Y',
            },
            sanGubun: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'BLACK_WHITE_LIST',
            tableName: 'black_white_list',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};