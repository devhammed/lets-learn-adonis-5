/*
|--------------------------------------------------------------------------
| API v1 Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP API v1 routes.
|
*/

import Route from '@ioc:Adonis/Core/Route';

Route
    .group(() => {
      Route.resource('users', 'UsersController').only(['store', 'show']);
    })
    .as('api.v1')
    .prefix('api/v1')
    .namespace('App/Controllers/Http/Api/V1');
