import axios from 'axios';
import nhp from 'node-html-parser';
import fsp from 'fs/promises';
import path from 'path';
import generateFilename from './generateFilename.js';
import writeFile from './writeFile.js';
import uploadSrc from './uploadSrc.js';

const pageLoader = (link, dir = process.cwd()) => {
  const filename = generateFilename(link, '.html');
  const nameDirForFiles = generateFilename(link, '_files');
  const dirPath = path.resolve(process.cwd(), dir, nameDirForFiles);
  let root;
  const arg = {
    link, nameDirForFiles, dirPath,
  };
  return fsp.mkdir(dirPath)
    .then(() => axios.get(link))
    .then((response) => response.data)
    .then((data) => {
      root = nhp.parse(data);
      return root;
    })
    .then(() => uploadSrc({
      elem: 'img', attr: 'src', root, ...arg,
    }))
    .then(() => uploadSrc({
      elem: 'link', attr: 'href', root, ...arg,
    }))
    .then(() => uploadSrc({
      elem: 'script', attr: 'src', root, ...arg,
    }))
    .then(() => writeFile(root.toString(), filename, dir))
    .catch((e) => console.log(e));
};

export default pageLoader;
