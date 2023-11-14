/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP Web routes.
|
*/

import Route from '@ioc:Adonis/Core/Route';

Route
    .group(() => {
        Route.get('/', async ({ view }) => {
          return view.render('welcome');
        }).as('welcome');

        Route.get('/socket', async ({ view }) => {
          return view.render('socket');
        }).as('socket');

        Route.get('/react', async ({ view }) => {
          return view.render('react');
        }).as('react');
    })
    .as('web');
