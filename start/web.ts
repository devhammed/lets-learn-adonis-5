/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
*/

import Route from '@ioc:Adonis/Core/Route';

Route.get('/', async ({ view }) => {
  return view.render('welcome');
});

Route.get('/socket', async ({ view }) => {
  return view.render('socket');
});
