/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP Web routes.
|
*/

import Route from '@ioc:Adonis/Core/Route';

Route.get('/', async ({ view }) => {
  return view.render('welcome');
});

Route.get('/socket', async ({ view }) => {
  return view.render('socket');
});
