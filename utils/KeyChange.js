const getRequest = require('../utils/getRequestId');

module.exports.KeyChange_event = function (table) {
    for(let k of table.tableData){
        Object.defineProperty(k, 'flag',
            Object.getOwnPropertyDescriptor(k, 'message_id'));
        delete k['message_id'];

        Object.defineProperty(k, 'timeAgent',
            Object.getOwnPropertyDescriptor(k, 'packet_time'));

        Object.defineProperty(k, 'nameAgent',
            Object.getOwnPropertyDescriptor(k, 'keeper_id'));
        delete k['keeper_id'];

        Object.defineProperty(k, 'vendorAgent',
            Object.getOwnPropertyDescriptor(k, 'make_id'));
        delete k['make_id'];

        Object.defineProperty(k, 'idOrganizationAgent',
            Object.getOwnPropertyDescriptor(k, 'unit_id'));
        delete k['unit_id'];

        Object.defineProperty(k, 'original',
            Object.getOwnPropertyDescriptor(k, 'payload'));
        delete k['payload'];

        Object.defineProperty(k, 'nameAttack',
            Object.getOwnPropertyDescriptor(k, 'anomaly_type'));

        Object.defineProperty(k, 'ipAttacker',
            Object.getOwnPropertyDescriptor(k, 'src_ip'));
        delete k['src_ip'];

        Object.defineProperty(k, 'ipVictim',
            Object.getOwnPropertyDescriptor(k, 'dst_ip'));
        delete k['dst_ip'];

        Object.defineProperty(k, 'macAttacker',
            Object.getOwnPropertyDescriptor(k, 'src_mac'));
        delete k['src_mac'];

        Object.defineProperty(k, 'macVictim',
            Object.getOwnPropertyDescriptor(k, 'dst_mac'));
        delete k['dst_mac'];

        Object.defineProperty(k, 'portAttacker',
            Object.getOwnPropertyDescriptor(k, 'src_port'));
        delete k['src_port'];

        Object.defineProperty(k, 'portVictim',
            Object.getOwnPropertyDescriptor(k, 'dst_port'));
        delete k['dst_port'];

        Object.defineProperty(k, 'protocol',
            Object.getOwnPropertyDescriptor(k, 'protocol_type'));
        delete k['protocol_type'];

        Object.defineProperty(k, 'levelRisk',
            Object.getOwnPropertyDescriptor(k, 'anomaly_type'));
        delete k['anomaly_type'];

        Object.defineProperty(k, 'timeAttackStart',
            Object.getOwnPropertyDescriptor(k, 'packet_time'));

        Object.defineProperty(k, 'timeAttackEnd',
            Object.getOwnPropertyDescriptor(k, 'packet_time'));
        delete k['packet_time'];

        delete k['send_time']; delete k['confirm_code'];  delete k['protocol_detail']; delete k['packet_code'];
        delete k['date_time']; delete k['trans_tag_e']; delete k['trans_tag_a']; delete k['device_mac']; delete k['trans_tag'];
    }

};

module.exports.KeyChange_state = function (table) {
    for (let k of table.tableData){
        Object.defineProperty(k, 'flag',
            Object.getOwnPropertyDescriptor(k, 'message_id'));
        delete k['message_id'];

        Object.defineProperty(k, 'nameAgent',
            Object.getOwnPropertyDescriptor(k, 'keeper_id'));
        delete k['keeper_id'];

        Object.defineProperty(k, 'timeAgent',
            Object.getOwnPropertyDescriptor(k, 'send_time'));
        delete k['send_time'];

        delete k['confirm_code']; delete k['date_time']; delete k['trans_tag_s']; delete k['trans_tag'];
    }
};

module.exports.KeyChange_manag_state = function (table) {
    for (let k of table.tableData){
        Object.defineProperty(k, 'flag',
            Object.getOwnPropertyDescriptor(k, 'message_id'));
        delete k['message_id'];

        Object.defineProperty(k, 'nameAgent',
            Object.getOwnPropertyDescriptor(k, 'operate_info_id'));
        delete k['operate_info_id'];

        Object.defineProperty(k, 'timeAgent',
            Object.getOwnPropertyDescriptor(k, 'send_time'));
        delete k['send_time'];

        delete k['date_time']; //delete k['trans_tag_s'];
        delete k['trans_tag'];
    }
};

module.exports.KeyChange_logevent = function (table) {
    for(let k of table.tableData){
        Object.defineProperty(k, 'flag',
            Object.getOwnPropertyDescriptor(k, 'message_id'));
        delete k['message_id'];

        Object.defineProperty(k, 'timeAgent',
            Object.getOwnPropertyDescriptor(k, 'sent_time'));
        delete k['sent_time'];

        Object.defineProperty(k, 'ipAgent',
            Object.getOwnPropertyDescriptor(k, 'assetIp'));
        delete k['assetIp'];

        Object.defineProperty(k, 'nameOperator',
            Object.getOwnPropertyDescriptor(k, 'plant_id'));
        delete k['plant_id'];

        Object.defineProperty(k, 'nameUnit',
            Object.getOwnPropertyDescriptor(k, 'machine_no'));
        delete k['machine_no'];

        Object.defineProperty(k, 'vendorAgent',
            Object.getOwnPropertyDescriptor(k, 'manufacturer_name'));
        delete k['manufacturer_name'];

        Object.defineProperty(k, 'nameModule',
            Object.getOwnPropertyDescriptor(k, 'log_type'));
        delete k['log_type'];

        Object.defineProperty(k, 'categoryModule',
            Object.getOwnPropertyDescriptor(k, 'log_category'));
        delete k['log_category'];

        Object.defineProperty(k, 'idOrganizationAgent',
            Object.getOwnPropertyDescriptor(k, 'device_id'));
        delete k['device_id'];

        Object.defineProperty(k, 'nameAgent',
            Object.getOwnPropertyDescriptor(k, 'device_name'));
        delete k['device_name'];

        Object.defineProperty(k, 'timeAttackStart',
            Object.getOwnPropertyDescriptor(k, 'loged_time'));

        Object.defineProperty(k, 'timeAttackEnd',
            Object.getOwnPropertyDescriptor(k, 'loged_time'));
        delete k['loged_time'];

        Object.defineProperty(k, 'nameAttack',
            Object.getOwnPropertyDescriptor(k, 'event_level'));

        Object.defineProperty(k, 'levelRisk',
            Object.getOwnPropertyDescriptor(k, 'event_level'));
        delete k['event_level'];

    }

};

module.exports.KeyChange_h005 = function (table) {
    for(let k of table){
        Object.defineProperty(k, 'unit_id',
            Object.getOwnPropertyDescriptor(k, 'unit'));
        delete k['unit'];

        Object.defineProperty(k, 'make_id',
            Object.getOwnPropertyDescriptor(k, 'make'));
        delete k['make'];

        k['request_id'] = getRequest.getRequestId();
    }

};

module.exports.KeyChange_traffic = function (table) {
    for (let k of table.tableData){
        Object.defineProperty(k, 'flag',
            Object.getOwnPropertyDescriptor(k, 'message_id'));
        delete k['message_id'];

        Object.defineProperty(k, 'timeAgent',
            Object.getOwnPropertyDescriptor(k, 'send_time'));
        delete k['send_time'];

        Object.defineProperty(k, 'nameAgent',
            Object.getOwnPropertyDescriptor(k, 'keeper_id'));
        delete k['keeper_id'];

        Object.defineProperty(k, 'idOrganizationAgent',
            Object.getOwnPropertyDescriptor(k, 'unit_id'));
        delete k['unit_id'];

        Object.defineProperty(k, 'vendorAgent',
            Object.getOwnPropertyDescriptor(k, 'make_id'));
        delete k['make_id'];

        Object.defineProperty(k, 'ppsTotal',
            Object.getOwnPropertyDescriptor(k, 'packet_cnt'));
        delete k['packet_cnt'];

        Object.defineProperty(k, 'bpsTotal',
            Object.getOwnPropertyDescriptor(k, 'inbound_cnt'));
        delete k['inbound_cnt'];

        Object.defineProperty(k, 'inPacket',
            Object.getOwnPropertyDescriptor(k, 'packet_byte'));
        delete k['packet_byte'];

        Object.defineProperty(k, 'inData',
            Object.getOwnPropertyDescriptor(k, 'inbound_byte'));
        delete k['inbound_byte'];

        delete k['date_time'];
    }
};