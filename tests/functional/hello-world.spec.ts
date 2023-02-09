import { test } from '@japa/runner';

test('display welcome page', async ({ client }) => {
  const response = await client.get('/');

  response.assertStatus(200);

  response.assertTextIncludes('<h1 class="title">It Works!</h1>');
});

test('display socket page', async ({ client }) => {
  const response = await client.get('/socket');

  response.assertStatus(200);

  response.assertTextIncludes(
    '<p class="subtitle">Check the console for socket messages.</p>'
  );
});
