const Sequelize = require('sequelize');

module.exports = class MOTIE_BW_HISTORY extends Sequelize.Model {
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
            ip: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            port: {
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
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'MOTIE_BW_HISTORY',
            tableName: 'motie_bw_history',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};
