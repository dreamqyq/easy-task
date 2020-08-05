const db = require('../db.js');
const fs = require('fs');
jest.mock('fs');

describe('db', () => {
  afterEach(() => {
    fs.clearMocks();
  });
  it('can read', async () => {
    const data = [{ title: 'test task', done: false }];
    fs.setReadFileMock('/testReadPath', null, JSON.stringify(data));
    const list = await db.read('/testReadPath');
    expect(list).toStrictEqual(data);
  });

  it('can write', async () => {
    let fakeFile;
    fs.setWriteFileMock('/testWritePath', (path, data, callback) => {
      fakeFile = data;
      callback(null);
    });
    const list = [
      { title: 'task 1', done: false },
      { title: 'task 2', done: true }
    ];
    await db.write(list, '/testWritePath');
    expect(fakeFile).toBe(JSON.stringify(list) + '\n');
  });
});
