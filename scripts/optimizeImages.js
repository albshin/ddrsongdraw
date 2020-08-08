#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const argv = require('yargs').usage(
  '$0 <srcDir> <outputDir>',
  'Optimizes images in a specified directory',
  (yargs) => {
    yargs.positional('srcDir', {
      describe: 'directory containing images to be optimized',
    });
    yargs.positional('outputDir', {
      describe: 'directory where optimized images will be outputted to',
    });
  }
).argv;

const formatBytes = (bytes) => {
  const sizes = ['B', 'kB', 'MB', 'GB'];
  if (bytes === 0) return '0 B';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return `${Math.round(bytes / Math.pow(1024, i), 2)} ${sizes[i]}`;
};

const newFilePath = (newFilename) => {
  return path.join(argv.outputDir, newFilename);
};

const main = () => {
  if (!fs.existsSync(argv.srcDir)) {
    console.log('Directory not found!');
    process.exit(1);
  }

  if (!fs.existsSync(argv.outputDir)) {
    console.log('Output directory not found! Creating...');
    fs.mkdirSync(argv.outputDir);
  }

  console.log('Optimizing images...');

  fs.readdirSync(argv.srcDir).forEach((filename) => {
    const filepath = path.join(argv.srcDir, filename);
    if (!fs.existsSync(filepath)) {
      console.log(`Could not find file: ${filepath}`);
      return;
    }
    if (fs.lstatSync(filepath).isDirectory()) return;

    const filesize = formatBytes(fs.statSync(filepath)['size']);

    const pipeline = sharp(filepath)
      .resize(160, 160)
      .on('error', () => {
        console.log(`Could not optimize file: ${filepath}, ${err.message}`);
      });

    // WebP
    pipeline
      .clone()
      .webp()
      .toFile(newFilePath(`${path.parse(filename).name}.webp`), (err, info) => {
        console.log(
          `- ${filename} webp (${filesize} -> ${formatBytes(info.size)})`
        );
      });

    // Resize
    pipeline.clone().toFile(newFilePath(filename), (err, info) => {
      console.log(
        `- ${filename} resize only (${filesize} -> ${formatBytes(info.size)})`
      );
    });
  });
};

main();
