import generateFilename from './generateFilename.js';

const getLocalUrl = (arg) => {
  const {
    elem, attr, root, link,
  } = arg;
  const elements = root.querySelectorAll(elem);
  const mainURL = new URL(link);

  const elementsWithLocalLink = elements.filter((el) => {
    const path = el.getAttribute(attr);
    const url = new URL(path, link);
    return url.hostname === mainURL.hostname;
  });

  const localUrls = elementsWithLocalLink
    .map((el) => {
      const path = el.getAttribute(attr);
      return new URL(path, link);
    })
    .map((el) => el.href);

  const newNamesforUrls = localUrls.map((url) => generateFilename(url));

  return { localUrls, elementsWithLocalLink, newNamesforUrls };
};

export default getLocalUrl;
