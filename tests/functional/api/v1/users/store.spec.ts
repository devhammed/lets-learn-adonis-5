import {test} from '@japa/runner';
import User from 'App/Models/User';
import {faker} from '@faker-js/faker';

const routeName = 'api.v1.users.store';

test.group(routeName, () => {
    test('it should require name', async ({client, route}) => {
        const response = await client
            .post(route(routeName))
            .json({
                email: faker.internet.email(),
                password: 'password',
                password_confirmation: 'password',
            })
            .send();

        response.assertStatus(422);

        response.assertBodyContains({
            errors: [
                {
                    message: 'required validation failed',
                    field: 'name',
                    rule: 'required',
                },
            ],
        });
    });

    test('it should require email', async ({client, route}) => {
        const response = await client
            .post(route(routeName))
            .json({
                name: 'John Doe',
                password: 'password',
                password_confirmation: 'password',
            })
            .send();

        response.assertStatus(422);

        response.assertBodyContains({
            errors: [
                {
                    message: 'required validation failed',
                    field: 'email',
                    rule: 'required',
                },
            ],
        });
    });

    test('it should require valid email', async ({client, route}) => {
        const response = await client
            .post(route(routeName))
            .json({
                name: 'John Doe',
                email: 'invalid-email',
                password: 'password',
                password_confirmation: 'password',
            })
            .send();

        response.assertStatus(422);

        response.assertBodyContains({
            errors: [
                {
                    message: 'email validation failed',
                    field: 'email',
                    rule: 'email',
                },
            ],
        });
    });

    test('it should require unique email', async ({client, route}) => {
        const email = faker.internet.email();

        await client
            .post(route(routeName))
            .json({
                name: 'John Doe',
                email,
                password: 'password',
                password_confirmation: 'password',
            })
            .send();

        const response = await client
            .post(route(routeName))
            .json({
                name: 'John Doe',
                email,
                password: 'password',
                password_confirmation: 'password',
            })
            .send();

        response.assertStatus(422);

        response.assertBodyContains({
            errors: [
                {
                    message: 'unique validation failure',
                    field: 'email',
                    rule: 'unique',
                },
            ],
        });
    });

    test('it should require password', async ({client, route}) => {
        const response = await client
            .post(route(routeName))
            .json({
                name: 'John Doe',
                email: faker.internet.email(),
                password_confirmation: 'password',
            })
            .send();

        response.assertStatus(422);

        response.assertBodyContains({
            errors: [
                {
                    message: 'required validation failed',
                    field: 'password',
                    rule: 'required',
                },
            ],
        });
    });

    test('it should require password minimum length', async ({client, route}) => {
        const response = await client
            .post(route(routeName))
            .json({
                name: 'John Doe',
                email: faker.internet.email(),
                password: 'pass',
                password_confirmation: 'pass',
            })
            .send();

        response.assertStatus(422);

        response.assertBodyContains({
            errors: [
                {
                    message: 'minLength validation failed',
                    field: 'password',
                    rule: 'minLength',
                },
            ],
        });
    });

    test('it should require password confirmation', async ({client, route}) => {
        const response = await client
            .post(route(routeName))
            .json({
                name: 'John Doe',
                email: faker.internet.email(),
                password: 'password',
            })
            .send();

        response.assertStatus(422);

        response.assertBodyContains({
            errors: [
                {
                    message: 'confirmed validation failed',
                    field: 'password_confirmation',
                    rule: 'confirmed',
                },
            ],
        });
    });

    test('it should be able to create a new user', async ({client, route}) => {
        const name = faker.name.fullName();

        const email = faker.internet.email();

        const response = await client
            .post(route(routeName))
            .json({
                name,
                email,
                password: 'password',
                password_confirmation: 'password',
            })
            .send();

        response.assertStatus(201);

        const user = await User.findByOrFail('email', email);

        response.assertBodyContains({
            ok: true,
            data: {
                id: user.id,
                name,
                email,
            },
        });
    });
});