const db = require('../db.js');
const fs = require('fs');
jest.mock('fs');

describe('db', () => {
  it('can read', async () => {
    const data = [{ title: 'test task', done: false }];
    fs.setMock('/testPath', null, JSON.stringify(data));
    const list = await db.read('/testPath');
    expect(list).toStrictEqual(data);
  });
});
