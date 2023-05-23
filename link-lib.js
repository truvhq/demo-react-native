const fs = require('fs');
const path = require('path');

const [moduleName, externalPath] = process.argv.slice(2);

const modulePath = path.resolve(__dirname, 'node_modules', moduleName);

link(modulePath, externalPath);

fs.watch(externalPath, { recursive: true }, (...e) => {
  link(modulePath, externalPath);
});

function removeFilesInDirectory(directoryPath, excludedDir) {
  const files = fs.readdirSync(directoryPath);

  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);

    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      if (file !== excludedDir) {
        // Recursively remove files inside subdirectories
        removeFilesInDirectory(filePath);
      }
    } else if (stats.isFile()) {
      // Remove individual file synchronously
      fs.unlinkSync(filePath);
    }
  });
}

function copyFilesRecursively(sourceDir, destinationDir, excludedDir) {
  if (!fs.existsSync(destinationDir)) {
    fs.mkdirSync(destinationDir);
  }

  const files = fs.readdirSync(sourceDir);

  files.forEach((file) => {
    const sourcePath = path.join(sourceDir, file);
    const destinationPath = path.join(destinationDir, file);

    if (fs.statSync(sourcePath).isDirectory()) {
      if (file !== excludedDir) {
        copyFilesRecursively(sourcePath, destinationPath, excludedDir);
      }
    } else {
      fs.copyFileSync(sourcePath, destinationPath);
    }
  });
}

function link(modulePath, externalPath) {
  removeFilesInDirectory(modulePath, 'node_modules');
  copyFilesRecursively(externalPath, modulePath, 'node_modules');
}
