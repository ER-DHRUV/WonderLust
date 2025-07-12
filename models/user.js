const { name } = require('ejs');
const mongoose = require('mongoose');
const Shcema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Shcema({
    email: {
        type: String,
        required: true,
    }
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);