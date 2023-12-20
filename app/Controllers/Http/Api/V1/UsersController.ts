import User from 'App/Models/User';
import UsersValidator from 'App/Validators/Api/V1/UsersValidator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UsersController {
    /**
     * Create a new user.
     */
    public async store({ request, response, bouncer }: HttpContextContract) {
        return bouncer
            .with('UserPolicy')
            .authorize('create')
            .then(async () => {
                const body = await request.validate(UsersValidator);

                const data = await User.create(body);

                return response.created({ data });
            });
    }

    /**
     * Get a user.
     */
    public async show({ response, params, bouncer }: HttpContextContract) {
        const data = await User.findOrFail(params.id);

        await bouncer
            .with('UserPolicy')
            .authorize('view', data);

        return response.ok({ data });
    }
}
