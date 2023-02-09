import { test } from '@japa/runner';
import Route from '@ioc:Adonis/Core/Route';

test('display welcome page', async ({ client }) => {
  const url = Route.makeUrl('web.welcome');

  const response = await client.get(url);

  response.assertStatus(200);

  response.assertTextIncludes('<h1 class="title">It Works!</h1>');
});
