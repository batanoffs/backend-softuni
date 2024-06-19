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

async function update(data) {
    //TODO extract properties from view model
    const record = new Data({
        prop: data.prop,
        author: aithorId,
    });

    await record.save();
    return record;
}

module.exports = {
    getAll,
    getById,
    create,
    update,
};
