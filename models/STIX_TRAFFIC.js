const Sequelize = require('sequelize');

module.exports = class STIX_TRAFFIC extends Sequelize.Model {
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
                type: Sequelize.STRING(10),
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
                defaultValue: '',
            },
            location: {
                type: Sequelize.STRING(20),
                allowNull: true,
                defaultValue: '',
            },
            original: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },

            ppsTotal: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            bpsTotal: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            ppsAccept: {
                type: Sequelize.STRING(20),
                allowNull: true,
                defaultValue: '',
            },
            ppsDrop: {
                type: Sequelize.STRING(20),
                allowNull: true,
                defaultValue: '',
            },
            bpsAccept: {
                type: Sequelize.STRING(20),
                allowNull: true,
                defaultValue: '',
            },
            bpsDrop: {
                type: Sequelize.STRING(20),
                allowNull: true,
                defaultValue: '',
            },
            inData: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            outData: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            inPacket: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            outPacket: {
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
            modelName: 'STIX_TRAFFIC',
            tableName: 'stix_traffic',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};