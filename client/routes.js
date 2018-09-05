const routes = require('next-routes')();

routes
  .add('/vehicles/new', '/vehicles/new')
  .add('/vehicles/:address', '/vehicles/show')
  .add('/vehicles/:address/logentries', '/vehicles/logentries/index')
  .add('/vehicles/:address/logentries/new', '/vehicles/logentries/new');

module.exports = routes;
