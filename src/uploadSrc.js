import downloadSource from './downloadSource.js';
import getLocalUrl from './getLocalUrl.js';
import replaceAttribute from './replaceAttribute.js';

const uploadSrc = (argum) => {
  const {
    root, link, elem, attr, nameDirForFiles, dirPath,
  } = argum;

  const {
    newNamesforUrls, elementsWithLocalLink, localUrls,
  } = getLocalUrl({
    elem, attr, root, link,
  });

  replaceAttribute({
    elementsWithLocalLink,
    newNamesforUrls,
    attr,
    nameDirForFiles,
  });

  const newPathLinks = localUrls.map((pathLink) => downloadSource(pathLink, dirPath));
  const promise = Promise.all(newPathLinks);

  return promise;
};

export default uploadSrc;
