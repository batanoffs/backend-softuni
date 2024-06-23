const { identityName } = require("../constants/identity");
const { User } = require("../models/User");
const bcrypt = require("bcrypt");

async function register(identity, username, password) {
    const existing = await User.findOne({ [identityName]: identity });

    if (existing) {
        throw new Error(`This ${identityName} is already in use`);
    }

    const user = new User({
        [identityName]: identity,
        username,
        password: await bcrypt.hash(password, 10),
    });

    try {
        await user.save();
    } catch (error) {
        if (error.code === 11000) {
            throw new Error(`This username is already in use`,); //TODO check for username and email if needed
        } else {
            throw new Error(`Exceptional error occured`);
        }
    }

    return user;
}

async function login(identity, password) {
    const user = await User.findOne({ identity });

    if (!user) {
        throw new Error(`Incorrect ${identityName} or password`);
    }

    const match = await bcrypt.compare(password, user.password);
    console.log("password" + password);
    console.log("user.password" + user.password);
    if (!match) {
        throw new Error(`Incorrect password`);
    }

    return user;
}

module.exports = { 
    register,
    login
 };
