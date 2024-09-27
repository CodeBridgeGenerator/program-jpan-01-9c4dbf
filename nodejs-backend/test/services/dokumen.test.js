const assert = require('assert');
const app = require('../../src/app');

describe('\'dokumen\' service', () => {
  it('registered the service', () => {
    const service = app.service('dokumen');

    assert.ok(service, 'Registered the service (dokumen)');
  });
});
