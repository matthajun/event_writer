const Sequelize = require('sequelize');

module.exports = class KDN_AMLY_H001 extends Sequelize.Model {
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
            ip_address: {
                type: Sequelize.STRING(15),
                allowNull: true,
            },
            disk_total_size: {
                type: Sequelize.STRING(10),
                allowNull: true,
            },
            disk_user_size: {
                type: Sequelize.STRING(10),
                allowNull: true,
            },
            date_time: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'KDN_AMLY_H001',
            tableName: 'kdn_amly_H001',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};