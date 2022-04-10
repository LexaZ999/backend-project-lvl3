import fs from 'fs/promises';
import getFilepath from './getFilepath.js';

const writeFile = (data, filename, pathDir = process.cwd()) => {
  const pathFile = getFilepath(filename, pathDir);
  fs.writeFile(pathFile, data);

  return pathFile;
};

export default writeFile;