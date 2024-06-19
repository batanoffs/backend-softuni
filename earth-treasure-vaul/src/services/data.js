const { Data } = require("../models/Data");

// TODO replace with real data service

async function getAll() {
    return Data.find().lean();
}

async function getById(id) {
    return Data.findById(id).lean();
}

async function create(data) {
    //TODO extract properties from view model
    const record = new Data({
        prop: data.prop,
        author: aithorId,
    });

    await record.save();
    return record;
}

async function update(id, data, userId) {
    //TODO extract properties from view model
    const record = await Data.findById(id);
    if (!record) {
        throw new ReferenceError(`Reacord not found ${id}`);
    }

    if (record.author.toString() != userId) {
        throw new Error("Access denied");
    }

    //TODO replace with real props
    record.prop = data.prop;

    await record.save();
    return record;
}

async function deleteById(id, userId) {
    const record = await Data.findById(id);
    if (!record) {
        throw new ReferenceError(`Reacord not found ${id}`);
    }

    if (record.author.toString() != userId) {
        throw new Error("Access denied");
    }

    await Data.findByIdAndDelete(id);
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById,
};
