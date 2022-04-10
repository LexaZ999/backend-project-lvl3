import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFilepath = (filename, dir) => (
  resolve(__dirname, '..', dir, filename));

export default getFilepath;
