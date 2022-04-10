import axios from 'axios';
import generateFilename from './generateFilename.js';
import writeFile from './writeFile.js';

const pageLoader = (link, dir) => {
  const filename = generateFilename(link);
  return axios.get(link)
    .then(({ data }) => writeFile(data, filename, dir))
    .catch((e) => console.log(e));
};

export default pageLoader;
