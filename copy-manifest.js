const fs = require("fs");
const path = require("path");

const sourceFolder = "extension";
const destinationFolder = "dist";

// Function to recursively copy directories
const copyDirectory = (source, destination) => {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination);
  }
  const files = fs.readdirSync(source);
  files.forEach((file) => {
    const sourceFilePath = path.join(source, file);
    const destinationFilePath = path.join(destination, file);
    if (fs.statSync(sourceFilePath).isDirectory()) {
      copyDirectory(sourceFilePath, destinationFilePath);
    } else {
      fs.copyFileSync(sourceFilePath, destinationFilePath);
      console.log(`${file} was copied to the ${destination} folder`);
    }
  });
};

// Main function to start copying
const copyFilesAndFolders = () => {
  if (!fs.existsSync(sourceFolder)) {
    console.error(`Source folder '${sourceFolder}' does not exist.`);
    return;
  }

  // Copy all files and folders recursively
  copyDirectory(sourceFolder, destinationFolder);
};

// Start copying process
copyFilesAndFolders();
