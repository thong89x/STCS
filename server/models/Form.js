const mongoose = require('mongoose');
const Post = require('./Post');

const formSchema = new mongoose.Schema({
    formQuestion:[String],
    formResponse:[String],
    listQuestion:[String]
});

const Form = mongooAse.model('form', formSchema, 'form');
module.exports = Form;      