import os from 'os';
import fsp from 'fs/promises';
import path from 'path';
import nock from 'nock';
import pageLoader from '../src/pageLoader.js';
import getFilepath from '../src/getFilepath.js';

nock.disableNetConnect();

let tempDir;

beforeEach(async () => {
  tempDir = await fsp.mkdtemp(path
    .join(os.tmpdir(), 'page-loader-'));
});

test('fetchData', async () => {
  const url = 'https://ru.hexlet.io/courses';
  const filepath = getFilepath('page.html', '__fixtures__');
  const expected = await fsp.readFile(filepath, 'utf-8');

  const filepathLogo = getFilepath('logo.png', '__fixtures__');
  const expectedLogo = await fsp.readFile(filepathLogo);
  const filepathNodejs = getFilepath('nodejs.png', '__fixtures__');
  const expectedNodejs = await fsp.readFile(filepathNodejs);

  nock('https://ru.hexlet.io')
    .get('/courses')
    .reply(200, expected)
    .get('/courses/assets/professions/logo.png')
    .reply(200, expectedLogo)
    .get('/courses/assets/professions/nodejs.png')
    .reply(200, expectedNodejs);

  const dirContents = await pageLoader(url, tempDir)
    .then(() => fsp.readdir(tempDir));

  const regHtml = /\.html$/g;
  const htmlFile = dirContents.find((filename) => regHtml.test(filename));
  const content = await fsp.readFile(path.join(tempDir, htmlFile), 'utf-8');
  expect(content).toBe(expected);

  const regFiles = /_files$/g;
  const dirnameFiles = dirContents.find((filename) => regFiles.test(filename));

  const dirFilesContents = await fsp.readdir(path.join(tempDir, dirnameFiles));

  const includeContent1 = await fsp
    .readFile(path.join(tempDir, dirnameFiles, dirFilesContents[0]));
  expect(includeContent1).toEqual(expectedLogo);

  const includeContent2 = await fsp
    .readFile(path.join(tempDir, dirnameFiles, dirFilesContents[1]));
  expect(includeContent2).toEqual(expectedNodejs);
});
