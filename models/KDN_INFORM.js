const Sequelize = require('sequelize');

module.exports = class KDN_INFORM extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            keeper_id: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            unit_id: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            make_id: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'KDN_INFORM',
            tableName: 'kdn_inform',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};