/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP API routes.
|
*/

import Route from '@ioc:Adonis/Core/Route';

function registerV1Routes() {
  Route.get('health', () => ({
    ok: true,
    message: 'We are up and running.',
  })).as('health');
}

function registerRoutes() {
  Route.group(registerV1Routes).as('v1').prefix('v1');
}

export default Route.group(registerRoutes).prefix('api').as('api');
