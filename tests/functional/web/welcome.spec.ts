import { test } from '@japa/runner';
import Route from '@ioc:Adonis/Core/Route';

const routeName = 'web.welcome';

test.group(routeName, () => {
  test('check if welcome page returns 200', async ({ client }) => {
    const url = Route.makeUrl(routeName);

    const response = await client.get(url);

    response.assertStatus(200);
  });

  test('check if welcome page contains "It works"', async ({ client }) => {
    const url = Route.makeUrl(routeName);

    const response = await client.get(url);

    response.assertTextIncludes('<h1 class="title">It Works!</h1>');
  });
});
