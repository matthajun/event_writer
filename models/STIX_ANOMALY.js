const Sequelize = require('sequelize');

module.exports = class STIX_ANOMALY extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            flag: {
                type: Sequelize.STRING(10),
                allowNull: true,
            },
            timeAgent: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            timezone: {
                type: Sequelize.STRING(20),
                allowNull: true,
                defaultValue: 'KST'
            },
            ipAgent: {
                type: Sequelize.STRING(30),
                allowNull: true,
                defaultValue: '',
            },
            nameAgent: {
                type: Sequelize.STRING(20),
                allowNull: true,
                defaultValue: '',
            },
            vendorAgent: {
                type: Sequelize.STRING(20),
                allowNull: true,
                defaultValue: '',
            },
            typeAgent: {
                type: Sequelize.STRING(20),
                allowNull: true,
                defaultValue: '',
            },
            versionAgent: {
                type: Sequelize.STRING(20),
                allowNull:true,
                defaultValue: '',
            },
            idOrganizationAgent: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            nameOperator: {
                type: Sequelize.STRING(20),
                allowNull: true,
                defaultValue: '',
            },
            nameUnit: {
                type: Sequelize.STRING(10),
                allowNull: true,
                defaultValue: 'DANGJIN',
            },
            location: {
                type: Sequelize.STRING(20),
                allowNull: true,
                defaultValue: '',
            },
            original: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            timeStart: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            timeEnd: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            candidates: {
                type: Sequelize.STRING(20),
                allowNull: true,
                defaultValue: '',
            },
            score: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            category: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            description: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            trans_tag: {
                type: Sequelize.STRING(20),
                allowNull: true,
                defaultValue: 'C',
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'STIX_ANOMALY',
            tableName: 'stix_anomaly',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};
