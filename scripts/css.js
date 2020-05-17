const path = require('path');
const fs = require('fs');

const chokidar = require('chokidar');
const sass = require('sass');

/** @type {string[]} */
const entryPoints = [
  path.join('src', 'scss', 'main.scss'),
  path.join('src', 'scss', 'home.scss'),
];

const targetDir = path.join('_site', 'common', 'css');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const compileSass = (/** @type {string} */ src) => {
  sass.render({ file: src }, (err, result) => {
    if (err) {
      console.error({ err });
    } else {
      const fileName = path.basename(src).replace('scss', 'css');

      fs.writeFile(path.join(targetDir, fileName), result.css, err => {
        if (err) {
          console.error(err);
        } else {
          console.log('CSS: finish compiling', src);
        }
      });
    }
  });
};

chokidar
  .watch(path.join('src', 'scss'), { ignoreInitial: true })
  .on('all', (ev, filePath) => {
    switch (ev) {
      case 'addDir':
        return;
    }

    console.log(`CSS: ${ev} ${filePath}`);
    entryPoints.forEach(compileSass);
  });
