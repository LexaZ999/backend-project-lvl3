import os from 'os';
import fs from 'fs/promises';
import path from 'path';
import nock from 'nock';
import pageLoader from '../src/pageLoader.js';

nock.disableNetConnect();

let tempDir;

beforeEach(async () => {
  tempDir = await fs.mkdtemp(path
    .join(os.tmpdir(), 'page-loader-'));
});

test('fetchData', async () => {
  const url = 'https://ru.hexlet.io/courses';
  const expected = '<!DOCTYPE html><html><body></body></html>';

  nock('https://ru.hexlet.io')
    .get('/courses')
    .reply(200, expected);

  const [, [filename]] = await Promise.all([
    await pageLoader(url, tempDir),
    await fs.readdir(tempDir),
  ]);

  const content = await fs.readFile(path.join(tempDir, filename), 'utf-8');

  expect(content).toBe(expected);
});
