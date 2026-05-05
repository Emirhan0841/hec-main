const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'public', 'assets');

async function convertImagesToWebP() {
  const files = fs.readdirSync(assetsDir);
  const pngFiles = files.filter(f => f.toLowerCase().endsWith('.png'));

  console.log(`Found ${pngFiles.length} PNG files to convert\n`);

  for (const file of pngFiles) {
    const inputPath = path.join(assetsDir, file);
    const outputPath = path.join(assetsDir, file.replace(/\.png$/i, '.webp'));

    const inputStats = fs.statSync(inputPath);
    const inputSize = inputStats.size;

    try {
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);

      const outputStats = fs.statSync(outputPath);
      const outputSize = outputStats.size;
      const savings = ((1 - outputSize / inputSize) * 100).toFixed(1);

      console.log(
        `✓ ${file.padEnd(35)} ${(inputSize / 1024 / 1024).toFixed(2)} MB → ${(outputSize / 1024 / 1024).toFixed(2)} MB (${savings}% smaller)`
      );
    } catch (err) {
      console.error(`✗ ${file}: ${err.message}`);
    }
  }
}

convertImagesToWebP().then(() => {
  console.log('\nConversion complete!');
}).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
