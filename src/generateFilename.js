const generateFilename = (link) => {
  const { hostname, pathname } = new URL(link);
  const name = `${hostname}${pathname}`.replace(/.$/, '');
  const newName = name.replace(/[\W_]/g, '-');
  const extension = '.html';
  return `${newName}${extension}`;
};

export default generateFilename;
