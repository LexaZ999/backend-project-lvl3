import fs from 'fs/promises';
import getFilepath from './getFilepath.js';

const writeFile = (data, filename, pathDir) => {
  const pathFile = getFilepath(filename, pathDir);

  return fs.writeFile(pathFile, data)
    .then(() => pathFile);
};

export default writeFile;
