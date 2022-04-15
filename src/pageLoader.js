import axios from 'axios';
import nhp from 'node-html-parser';
import fsp from 'fs/promises';

import generateFilename from './generateFilename.js';
import writeFile from './writeFile.js';
import downloadImg from './downloadImg.js';
import getFilepath from './getFilepath.js';

const pageLoader = (link, dir = process.cwd()) => {
  const filename = generateFilename(link, '.html');
  const dirname = generateFilename(link, '_files');
  const dirPath = getFilepath(dirname, dir);

  return fsp.mkdir(dirPath)
    .then(() => axios.get(link))
    .then((response) => response.data)
    .then((data) => {
      const root = nhp.parse(data);
      const elemImages = root.querySelectorAll('img');
      const pathImages = elemImages
        .map((el) => el.getAttribute('src')
          .replace(/(^\.|\.\.)(\/)|(^\/)/g, ''));
      return { data, pathImages };
    })
    .then(({ data, pathImages }) => {
      const promises = pathImages.map((pathImg) => {
        const urlImg = `${link.replace(/\/$/g, '')}/${pathImg}`;
        return downloadImg(urlImg, dirPath);
      });
      return Promise.all([data, ...promises]);
    })
    .then(([data]) => writeFile(data, filename, dir));
};

export default pageLoader;
