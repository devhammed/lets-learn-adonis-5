/*
|--------------------------------------------------------------------------
| API v1 Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP API v1 routes.
|
*/

import Route from '@ioc:Adonis/Core/Route';

function registerRoutes() {
  Route.get('/health', () => ({
    ok: true,
    message: 'We are up and running!',
  })).as('health');
}

export default Route.group(registerRoutes).as('api.v1').prefix('api/v1');
