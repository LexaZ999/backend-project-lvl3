import generateFilename from '../src/generateFilename.js';

test('generateFilename', () => {
  const link1 = 'https://github.com/tj/commander/';
  const expectedName1 = 'github-com-tj-commander.html';
  expect(generateFilename(link1, '.html')).toBe(expectedName1);

  const link2 = 'https://github.com/tj/commander.js/courses/pig.png';
  const expectedName2 = 'github-com-tj-commander-js-courses-pig.png';
  expect(generateFilename(link2)).toBe(expectedName2);
});
