const Sequelize = require('sequelize');

module.exports = class STIX_EVENT extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            flag: {
                type: Sequelize.STRING(10),
                allowNull: true,
            },
            timeAgent: {
                type: Sequelize.STRING(40),
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
                type: Sequelize.STRING(40),
                allowNull: true,
                defaultValue: '',
            },
            vendorAgent: {
                type: Sequelize.STRING(20),
                allowNull: true,
                defaultValue: '',
            },
            typeAgent: {
                type: Sequelize.STRING(40),
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
                type: Sequelize.STRING(100),
                allowNull: true,
                defaultValue: '',
            },
            nameAttack: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            timeAttackStart: {
                type: Sequelize.STRING(20),
                allowNull: true,
                defaultValue: '',
            },
            timeAttackEnd: {
                type: Sequelize.STRING(20),
                allowNull: true,
                defaultValue: '',
            },
            ipAttacker: {
                type: Sequelize.STRING(20),
                allowNull: true,
                defaultValue: '',
            },
            ipVictim: {
                type: Sequelize.STRING(20),
                allowNull: true,
                defaultValue: '',
            },
            macAttacker: {
                type: Sequelize.STRING(20),
                allowNull: true,
                defaultValue: '',
            },
            macVictim: {
                type: Sequelize.STRING(50),
                allowNull: true,
                defaultValue: '',
            },
            portAttacker: {
                type: Sequelize.STRING(20),
                allowNull: true,
                defaultValue: '',
            },
            portVictim: {
                type: Sequelize.STRING(20),
                allowNull: true,
                defaultValue: '',
            },
            protocol: {
                type: Sequelize.STRING(20),
                allowNull: true,
                defaultValue: '',
            },
            ipVersion: {
                type: Sequelize.STRING(20),
                allowNull: true,
                defaultValue: '',
            },
            levelRisk: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            typeAction: {
                type: Sequelize.STRING(20),
                allowNull: true,
                defaultValue: '',
            },
            countAttack: {
                type: Sequelize.STRING(20),
                allowNull: true,
                defaultValue: '',
            },
            idRule: {
                type: Sequelize.STRING(20),
                allowNull: true,
                defaultValue: '',
            },
            nameModule: {
                type: Sequelize.STRING(20),
                allowNull: true,
                defaultValue: '',
            },
            categoryModule: {
                type: Sequelize.STRING(20),
                allowNull: true,
                defaultValue: '',
            },
            lengthPacket: {
                type: Sequelize.STRING(20),
                allowNull: true,
                defaultValue: '',
            },
            directionAttack: {
                type: Sequelize.STRING(20),
                allowNull: true,
                defaultValue: '',
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
            modelName: 'STIX_EVENT',
            tableName: 'stix_event',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};
