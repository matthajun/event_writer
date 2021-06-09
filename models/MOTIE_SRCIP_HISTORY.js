const Sequelize = require('sequelize');

module.exports = class MOTIE_SRCIP_HISTORY extends Sequelize.Model {
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
            request_id: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            unit_id: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            make_id: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            created_type: {
                type: Sequelize.STRING(10),
                allowNull: true,
            },
            policy_type: {
                type: Sequelize.STRING(10),
                allowNull: true,
            },
            policy_detail_type: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            protocol_type: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            protocol_detail: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            src_ip: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            src_port: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            dst_ip: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            dst_port: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            start_time: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            end_time: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            date_time: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            res_cd: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            res_msg: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'MOTIE_SRCIP_HISTORY',
            tableName: 'motie_srcip_history',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};
