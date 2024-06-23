const { Schema, model, Types } = require("mongoose"); //types for relation

//TODO add/change properties depending on exam description

const dataSchema = new Schema({
    props: {
        type: String,
        required: true,
        unique: true,
    },
    author: {
        type: Types.ObjectId,
        ref: 'User'
    },
});

const Data = model("Data", dataSchema);

module.exports = { Data };
