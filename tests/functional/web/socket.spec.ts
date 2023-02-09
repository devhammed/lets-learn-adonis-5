import { test } from '@japa/runner';
import Route from '@ioc:Adonis/Core/Route';

const routeName = 'web.socket';

test.group(routeName, () => {
  test('check if socket page returns 200', async ({ client }) => {
    const url = Route.makeUrl(routeName);

    const response = await client.get(url);

    response.assertStatus(200);
  });

  test('check if socket page has "check console" text', async ({ client }) => {
    const url = Route.makeUrl(routeName);

    const response = await client.get(url);

    response.assertTextIncludes(
      '<p class="subtitle">Check the console for socket messages.</p>'
    );
  });
});
