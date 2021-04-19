const Sequelize = require('sequelize');

module.exports = class KDN_AMLY_H004_POLICY_BL extends Sequelize.Model {
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
            unit_id: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            make_id: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            ip: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            port: {
                type: Sequelize.STRING(20),
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
            trans_tag_bw: {
                type: Sequelize.STRING(10),
                allowNull: false,
                defaultValue: 'C',
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'KDN_AMLY_H004_POLICY_BL',
            tableName: 'kdn_amly_H004_policy_bl',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};