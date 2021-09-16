const Sequelize = require('sequelize');

module.exports = class KDN_AMLY_H008_FILE_LIST extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            message_id: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            keeper_id: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            send_time: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            confirm_code: {
                type: Sequelize.STRING(20),
                allowNull: false,
                defaultValue: 'local',
            },
            file_list: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            sectValue: {
                type: Sequelize.STRING(10),
                allowNull: false,
                defaultValue: 'N',
            },
            date_time: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            trans_tag: {
                type: Sequelize.STRING(10),
                allowNull: false,
                defaultValue: 'C',
            },
            file_tag: {
                type: Sequelize.STRING(10),
                allowNull: false,
                defaultValue: 'C',
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'KDN_AMLY_H008_FILE_LIST',
            tableName: 'kdn_amly_H008_file_list',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};