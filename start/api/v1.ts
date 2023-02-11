/*
|--------------------------------------------------------------------------
| API v1 Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP API v1 routes.
|
*/

import HealthCheck from '@ioc:Adonis/Core/HealthCheck';
import Route from '@ioc:Adonis/Core/Route';

function registerAuthRoutes() {
  Route.post('login', 'AuthController.login').as('login');
  Route.post('register', 'AuthController.register').as('register');
  Route.get('me', 'AuthController.me').as('me').middleware('auth:api');
  Route.post('logout', 'AuthController.logout')
    .as('logout')
    .middleware('auth:api');
}

function registerRoutes() {
  Route.get('health', async ({ response }) => {
    const { healthy: ok, report: data } = await HealthCheck.getReport();

    if (!ok) {
      return response.status(500).json({
        ok,
        message: 'Health check failed.',
        data,
      });
    }

    return response.status(200).json({
      ok,
      message: 'Health check successful.',
      data,
    });
  }).as('health');

  Route.group(registerAuthRoutes).as('auth').prefix('auth');
}

export default Route.group(registerRoutes)
  .as('api.v1')
  .prefix('api/v1')
  .namespace('App/Controllers/Http/Api/V1');
