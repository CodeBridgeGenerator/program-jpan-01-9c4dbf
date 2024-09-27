const assert = require('assert');
const app = require('../../src/app');

describe('\'latihan\' service', () => {
  it('registered the service', () => {
    const service = app.service('latihan');

    assert.ok(service, 'Registered the service (latihan)');
  });
});
