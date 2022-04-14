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

  fsp.mkdir(dirPath);

  const pageHtml = axios.get(link)
    .then((response) => response.data);

  const pathImagesPromise = pageHtml.then((data) => {
    const root = nhp.parse(data);
    const elemImages = root.querySelectorAll('img');
    const pathImages = elemImages
      .map((el) => el.getAttribute('src')
        .replace(/(^\.|\.\.)(\/)|(^\/)/g, ''));

    return pathImages;
  });

  pathImagesPromise.then((pathImages) => {
    pathImages.forEach((pathImg) => {
      const urlImg = `${link.replace(/\/$/g, '')}/${pathImg}`;
      downloadImg(urlImg, dirPath);
    });
  });

  return pageHtml
    .then((data) => writeFile(data, filename, dir));
};

export default pageLoader;
