const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const registryformSchema = new mongoose.Schema({
    userID: {type:Schema.Types.ObjectID,required: true},
    postID:{type:Sting, default:''},
    starRatings:{type:Number, default:0},
    //cmtLike:{type:Number, default:0},
    listAnswer: [String],
    statusRegForm:{type:String, default:''},
    timeTimeApproved:{
        type: Date,
        required:true
    },
},{timestamps:true});

const RegistryForm = mongooAse.model('registryform', registryformSchema, 'registryform');
module.exports = RegistryForm;  