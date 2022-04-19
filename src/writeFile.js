import fs from 'fs/promises';
import path from 'path';

const writeFile = (data, filename, pathDir) => {
  const pathFile = path.resolve(process.cwd(), pathDir, filename);

  return fs.writeFile(pathFile, data)
    .then(() => pathFile);
};

export default writeFile;
