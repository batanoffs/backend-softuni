const fs = require("fs/promises");
const path = require("path");

// function readFile(filePath) {
//     // using synchronous reading just for testing and student pursosesn note - DO NOT USE
//     const data = fs.readFileSync(path.join("./", filePath));
//     return data.toString();
// }

const searchBar = `
<form action="/search">
    <input type="text">
    <button type="button">Search</button>
</form>`;

async function readFile(filePath) {
    const fileHandler = await fs.open(path.join("./", filePath), "r");
    return fileHandler.createReadStream();
}

async function readTemplate(template) {
    const data = await fs.readFile(path.join("./views/", template + ".html"));
    return data.toString();
}

async function layout(body, hasSearchBar) {
    let template = await readTemplate("layout");
    let search = "";

    if (hasSearchBar) {
        search = searchBar;
    }

    template = template.replace("%%searchBar%%", search);

    return template.replace("%%body%%", body);
}
module.exports = {
    readFile,
    readTemplate,
    layout,
};
