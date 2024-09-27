const { Calon } = require('./calon.class');
const createModel = require('../../models/calon.model');
const hooks = require('./calon.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/calon', new Calon(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('calon');

  // Get the schema of the collections 
  app.get("/calonSchema", function (request, response) {
    const schema = createModel(app).schema.tree;
    const result = Object.keys(schema).map(key => {
      return {
        field: key,
        properties: schema[key]
      };
    });
    return response.status(200).json(result);
  });

  service.hooks(hooks);
};