const Sequelize = require('sequelize');

module.exports = class KDN_AMLY_H013 extends Sequelize.Model {
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
            res_cd: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            res_msg: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            contents:{
                type: Sequelize.TEXT,
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
            modelName: 'KDN_AMLY_H013',
            tableName: 'kdn_amly_H013',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};
