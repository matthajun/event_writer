const Sequelize = require('sequelize');

module.exports = class KDN_AMLY_H012 extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            message_id: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            keeper_id: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            send_time: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            unit_id: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            make_id: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            packet_cnt: {
                type: Sequelize.STRING(40),
                allowNull: true,
            },
            inbound_cnt: {
                type: Sequelize.STRING(40),
                allowNull: true,
            },
            packet_byte: {
                type: Sequelize.STRING(40),
                allowNull: true,
            },
            inbound_byte: {
                type: Sequelize.STRING(40),
                allowNull: true,
            },
            date_time: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            trans_tag_t: {
                type: Sequelize.STRING(10),
                allowNull: false,
                defaultValue: 'C',
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'KDN_AMLY_H012',
            tableName: 'kdn_amly_H012',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};
