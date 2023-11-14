import User from 'App/Models/User';
import UsersValidator from 'App/Validators/Api/V1/UsersValidator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UsersController {
    /**
     * Create a new user.
     */
    public async store({ request }: HttpContextContract) {
        const data = await request.validate(UsersValidator);

        const user = await User.create(data);

        return { ok: true, data: user };
    }

    /**
     * Get a user.
     */
    public async show({ params }: HttpContextContract) {
        const user = await User.findOrFail(params.id);

        return { ok: true, data: user };
    }
}
