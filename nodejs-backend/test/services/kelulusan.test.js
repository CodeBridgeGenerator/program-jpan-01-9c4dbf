const assert = require('assert');
const app = require('../../src/app');

describe('\'kelulusan\' service', () => {
  it('registered the service', () => {
    const service = app.service('kelulusan');

    assert.ok(service, 'Registered the service (kelulusan)');
  });
});
