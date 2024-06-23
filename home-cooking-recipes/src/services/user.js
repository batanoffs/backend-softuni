const { identityName } = require("../constants/identity");
const { User } = require("../models/User");
const bcrypt = require("bcrypt");

async function register(username, identity, password) {
    const existing = await User.findOne({ [identityName]: identity });

    if (existing) {
        throw new Error(`This ${identityName} is already in use`);
    }

    const user = new User({
        username,
        [identityName]: identity,
        password: await bcrypt.hash(password, 10),
    });

    try {
        await user.save();
    } catch (error) {
        if (error.code === 11000) {
            // error duplicate name
            throw new Error(`This username is already in use`);
        } else {
            throw new Error(`Exceptional error occured`, error);
        }
    }

    return user;
}

async function login(identity, password) {
    const check = {
        [identityName]: identity,
    };

    const user = await User.findOne(check);

    if (!user) {
        throw new Error(`Incorrect ${identityName} or password`);
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new Error(`Incorrect password`);
    }

    return user;
}

module.exports = { register, login };
