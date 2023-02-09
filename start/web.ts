/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP Web routes.
|
*/

import Route from '@ioc:Adonis/Core/Route';

function registerRoutes() {
  Route.get('/', async ({ view }) => {
    return view.render('welcome');
  }).as('home');

  Route.get('/socket', async ({ view }) => {
    return view.render('socket');
  }).as('socket');
}

export default Route.group(registerRoutes).as('web');
