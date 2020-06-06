#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const argv = require('yargs')
  .usage('$0 <directory>', 'Optimizes images in a specified directory', yargs => {
    yargs.positional('directory', {
      describe: 'directory containing images to be optimized'
    })
  }).argv;

const formatBytes = (bytes) => {
    const sizes = ['B', 'kB', 'MB', 'GB'];
    if (bytes === 0) return '0 B';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return `${Math.round(bytes / Math.pow(1024, i), 2)} ${sizes[i]}`
}

const main = () => {
  if (!fs.existsSync(argv.directory)) {
    console.log('Directory not found!')
    process.exit(1);
  }

  console.log('Optimizing images...')

  fs.readdirSync(argv.directory).forEach(filename => {
    const filepath = path.join(argv.directory, filename);
    const filesize = fs.statSync(filepath)['size'];

    if (!fs.existsSync(filepath)) {
      console.log(`Could not find file: ${filepath}`);
    }

    // Ignore left over optimization files
    if (filepath.includes('.tmp')) {
      return;
    }

    const tempFileName = `${filepath}_optimized.tmp`;
    sharp(filepath).resize(256, 256).toFile(tempFileName, (err, info) => {
      if (err != null) {
        console.log(`Could not optimize file: ${filepath}, ${err.message}`)
        return;
      }
      fs.renameSync(tempFileName, filepath)
      console.log(`- ${filepath} (${formatBytes(filesize)} -> ${formatBytes(info.size)})`);
    });
  });
}

main();


