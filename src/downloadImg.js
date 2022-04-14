import axios from 'axios';
import fsp from 'fs/promises';
import path from 'path';
import generateFilename from './generateFilename.js';

const downloadImg = (url, dirname) => {
  const filename = generateFilename(url);

  axios({
    method: 'get',
    url,
    responseType: 'stream',
  })
    .then((res) => {
      fsp.writeFile(path.join(dirname, filename), res.data);
    });
};

export default downloadImg;
