import User from 'App/Models/User';
import UsersValidator from 'App/Validators/Api/V1/UsersValidator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UsersController {
    /**
     * Create a new user.
     */
    public async store({ request, bouncer }: HttpContextContract) {
        return bouncer
            .with('UserPolicy')
            .authorize('create')
            .then(async () => {
                const data = await request.validate(UsersValidator);

                const user = await User.create(data);

                return { ok: true, data: user };
            });
    }

    /**
     * Get a user.
     */
    public async show({ params, bouncer }: HttpContextContract) {
        const user = await User.findOrFail(params.id);

        await bouncer.with('UserPolicy').authorize('view', user);

        return { ok: true, data: user };
    }
}
