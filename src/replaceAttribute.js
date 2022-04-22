import path from 'path';

const replaceAttribute = (obj) => {
  const {
    elementsWithLocalLink,
    newNamesforUrls,
    attr,
    nameDirForFiles,
  } = obj;

  elementsWithLocalLink.forEach((el, index) => el
    .setAttribute(attr, path.join(nameDirForFiles, newNamesforUrls[index])));
};

export default replaceAttribute;
