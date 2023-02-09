import { test } from '@japa/runner';
import Route from '@ioc:Adonis/Core/Route';

test('display socket page', async ({ client }) => {
  const url = Route.makeUrl('web.socket');

  const response = await client.get(url);

  response.assertStatus(200);

  response.assertTextIncludes(
    '<p class="subtitle">Check the console for socket messages.</p>'
  );
});
