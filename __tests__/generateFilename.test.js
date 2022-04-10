import generateFilename from '../src/generateFilename.js';

test('generateFilename', () => {
  const link = 'https://github.com/tj/commander.js/';
  const expectedName = 'github-com-tj-commander-js.html';

  expect(generateFilename(link)).toBe(expectedName);
});
