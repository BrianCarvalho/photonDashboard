const mongoose = require('mongoose');

const devicesAPI = new mongoose.Schema({
    id: String,
    name: String,
    last_app: String,
    last_ip_address: String,
    last_heard: { type: Date, default: Date.now },
    product_id: Number,
    connected: Boolean,
    platform_id: Number,
    cellular: Boolean,
    notes: String,
    status: String,
    serial_number: String,
    current_build_target: String,
    system_firmware_version: String,
    default_build_target: String,
    statusCode: Number 

})


var devicesModel = mongoose.model('devices', devicesAPI);
module.exports = devicesModel;