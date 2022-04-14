import path from 'path';

const generateFilename = (link, extension) => {
  const { hostname, pathname } = new URL(link);
  const { dir, name, ext } = path.parse(pathname);

  const filename = path
    .join(hostname, dir, name)
    .replace(/\/$/, '')
    .replace(/[\W_]/g, '-');

  return `${filename}${extension || ext}`;
};

export default generateFilename;
