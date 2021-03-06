import axios from 'axios';
import fsp from 'fs/promises';
import path from 'path';
import generateFilename from './generateFilename.js';

const downloadSource = (url, dirname) => {
  const filename = generateFilename(url);

  return axios({
    method: 'get',
    url,
    responseType: 'stream',
  })
    .then((res) => fsp.writeFile(path.join(dirname, filename), res.data))
    .then(() => filename);
};

export default downloadSource;
