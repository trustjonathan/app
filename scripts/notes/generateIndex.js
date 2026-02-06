// scripts/notes/generateIndex.js

const fs = require("fs");
const path = require("path");

// absolute path to /resources folder
const resourcesRoot = path.join(__dirname, "../../resources");

function scanFolder(folderName) {
  const folderPath = path.join(resourcesRoot, folderName);
  if (!fs.existsSync(folderPath)) return [];

  return fs
    .readdirSync(folderPath)
    .filter(file => file.toLowerCase().endsWith(".pdf"))
    .map(file => ({
      name: file.replace(/\.pdf$/i, ""),
      url: `../../resources/${folderName}/${file}`
    }));
}

const output = {
  biology: scanFolder("biology-notes"),
  chemistry: scanFolder("chemistry-notes"),
  mathematics: scanFolder("mathematics-notes")
};

fs.writeFileSync(
  path.join(__dirname, "notesIndex.json"),
  JSON.stringify(output, null, 2)
);

console.log("✔ notesIndex.json created successfully!");
