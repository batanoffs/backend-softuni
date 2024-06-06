const fs = require("fs/promises");

const filePath = "./data/cats.json";

async function readData() {
    const json = await fs.readFile(filePath);
    const data = JSON.parse(json.toString());
    return data;
}

async function writeData(data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    return data;
}

async function getCats() {
    const data = await readData();
    return data.cats;
}

async function getBreeds() {
    const data = await readData();
    return data.breeds;
}

async function addBreed(breed) {
    const cats = await readData();
    cats.breeds.push(breed);

    await writeData(cats);
}

module.exports = {
    getCats,
    getBreeds,
    addBreed,
};
