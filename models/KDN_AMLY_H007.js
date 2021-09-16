const Sequelize = require('sequelize');

module.exports = class KDN_AMLY_H007 extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            anomaly_seq: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
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
            unit_id: {
                type: Sequelize.STRING(15),
                allowNull: true,
            },
            make_id: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            anomaly_type: {
                type: Sequelize.STRING(10),
                allowNull: true,
            },
            protocol_type: {
                type: Sequelize.STRING(10),
                allowNull: true,
            },
            protocol_detail: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            src_ip: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            src_mac: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            src_port: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            dst_ip: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            dst_mac: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            dst_port: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            payload: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            packet_code: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            policy_name: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            packet_time: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            event_time: {
                type: Sequelize.STRING(30),
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
            trans_tag_e: {
                type: Sequelize.STRING(30),
                allowNull: false,
                defaultValue: 'C',
            },
            trans_tag_a: {
                type: Sequelize.STRING(30),
                allowNull: false,
                defaultValue: 'C',
            }

        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'KDN_AMLY_H007',
            tableName: 'kdn_amly_H007',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_unicode_ci',
        });
    }
};
