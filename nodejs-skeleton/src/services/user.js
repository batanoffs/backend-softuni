const { identityName } = require("../constants/identity");
const { User } = require("../models/User");
const bcrypt = require("bcrypt");

async function register(identity, password) {  //TODO add props if needed (username)
    const existing = await User.findOne({ [identityName]: identity });

    if (existing) {
        throw new Error(`This ${identityName} is already in use`);
    }

    const user = new User({
        [identityName]: identity,
        password: await bcrypt.hash(password, 10), //TODO add props if needed (username)
    });

    try {
        await user.save();
    } catch (error) {
        if (error.code === 11000) { // error duplicate name
            throw new Error(`This username is already in use`); //TODO check for username and email if needed
        } else {
            throw new Error(`Exceptional error occured`, error);
        }
    }

    return user;
}

async function login(identity, password) {
    const user = await User.findOne({ [identityName]: identity });

    if (!user) {
        throw new Error(`Incorrect ${identityName} or password`);
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw new Error(`Incorrect ${identityName} or password`);
    }

    return user;
}

module.exports = { register, login };
