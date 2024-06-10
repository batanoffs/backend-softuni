const data = require("../../data/catalogue.json");
let nextID = 6;

const getParts = () => {
    return data;
};

const getPartByID = (id) => {
    return data.find((p) => p.id === id);
};

const createPart = (partData) => {
    const part = {
        id: nextID++,
        name: partData.name,
        price: partData.price,
        description: partData.description,
    };
    data.push(part);
    return part;
};

function updatePart(id, partData) {
    const part = getPartByID(id);
    part.name = partData.name;
    part.price = Number(partData.price);
    part.stock = Number(partData.stock);
    part.description = partData.description;

    return part;
}

function deletePart(id) {
    data = data.filter((p) => p.id !== id);
}

module.exports = {
    getParts,
    getPartByID,
    createPart,
    updatePart,
    deletePart,
};
