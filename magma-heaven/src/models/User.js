const { Schema, model } = require("mongoose");

//TODO add/change properties depending on exam description

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            //TODO check regEx
        },
    },
    {
        collation: {
            locale: "en",
            strength: 2,
        },
    }
);

const User = model("User", userSchema);

module.exports = { User };
