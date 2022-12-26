const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const registryformSchema = new mongoose.Schema({
    userID: {type:Schema.Types.ObjectID,required: true},
    postID:{type:Schema.Types.ObjectID,required: true},
    listAnswer: [String],
    statusRegForm:{type:String, default:''},
},{timestamps:true});

const RegistryForm = mongoose.model('registryform', registryformSchema, 'registryform');
module.exports = RegistryForm;  