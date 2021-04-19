const Sequelize = require('sequelize');

module.exports = class KDN_AMLY_H001_PROCESS_INFO extends Sequelize.Model {
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
                type: Sequelize.STRING(15),
                allowNull: true,
            },
            confirm_code: {
                type: Sequelize.STRING(20),
                allowNull: false,
                defaultValue: 'local',
            },
            process_id: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            process_name: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            process_status: {
                type: Sequelize.STRING(10),
                allowNull: true,
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
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'KDN_AMLY_H001_PROCESS_INFO',
            tableName: 'kdn_amly_H001_process_info',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};