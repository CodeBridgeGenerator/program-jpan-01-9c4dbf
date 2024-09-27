const assert = require('assert');
const app = require('../../src/app');

describe('\'calon\' service', () => {
  it('registered the service', () => {
    const service = app.service('calon');

    assert.ok(service, 'Registered the service (calon)');
  });
});
