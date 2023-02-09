import { test } from '@japa/runner';
import Route from '@ioc:Adonis/Core/Route';

test('check api health', async ({ client }) => {
  const url = Route.makeUrl('api.v1.health');

  const response = await client.get(url);

  response.assertStatus(200);

  response.assertBodyContains({
    ok: true,
  });
});
