import { test } from '@japa/runner';
import Route from '@ioc:Adonis/Core/Route';

const routeName = 'api.v1.health';

test.group(routeName, () => {
  test('check if api health is 200', async ({ client }) => {
    const url = Route.makeUrl(routeName);

    const response = await client.get(url);

    response.assertStatus(200);
  });

  test('check if api health contains "ok" boolean', async ({ client }) => {
    const url = Route.makeUrl(routeName);

    const response = await client.get(url);

    response.assertBodyContains({
      ok: true,
    });
  });
});
