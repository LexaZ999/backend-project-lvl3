import axios from 'axios';
import nhp from 'node-html-parser';
import fsp from 'fs/promises';
import path from 'path';
import generateFilename from './generateFilename.js';
import writeFile from './writeFile.js';
import downloadImg from './downloadImg.js';
import getFilepath from './getFilepath.js';

const pageLoader = (link, dir = process.cwd()) => {
  const filename = generateFilename(link, '.html');
  const dirname = generateFilename(link, '_files');
  const dirPath = getFilepath(dirname, dir);

  let root;
  let elemImages;

  return fsp.mkdir(dirPath)
    .then(() => axios.get(link))
    .then((response) => response.data)
    .then((data) => {
      root = nhp.parse(data);
      elemImages = root.querySelectorAll('img');
      const pathImages = elemImages
        .map((el) => el.getAttribute('src')
          .replace(/(^\.|\.\.)(\/)|(^\/)/g, ''));

      return pathImages;
    })
    .then((pathImages) => {
      const newPathImges = pathImages.map((pathImg) => {
        const urlImg = `${link.replace(/\/$/g, '')}/${pathImg}`;
        return downloadImg(urlImg, dirPath);
      });
      return Promise.all(newPathImges);
    })
    .then((newPathImges) => {
      elemImages.forEach((el, index) => el.setAttribute('src', path.join(dirname, newPathImges[index])));
      return root.toString();
    })
    .then((data) => writeFile(data, filename, dir));
};

export default pageLoader;
