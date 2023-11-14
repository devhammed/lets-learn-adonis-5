import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ApiTokensValidator from 'App/Validators/Api/V1/ApiTokensValidator';

export default class ApiTokensController {
    /**
     * Create a new user token.
     */
    public async store({ request, auth }: HttpContextContract) {
        const { email, password } = await request.validate(ApiTokensValidator);

        try {
            const {
                token,
                type,
                expiresAt,
            } = await auth
                .use('api')
                .attempt(email, password, { expiresIn: '30 days' });

            return {
                ok: true,
                data:{
                    token,
                    type,
                    expiresAt: expiresAt?.toUnixInteger(),
                },
            };
        } catch {
            return { ok: false, message: 'Invalid credentials.' };
        }
    }

    /**
     * Revoke user token.
     */
    public async destroy({ auth }: HttpContextContract) {
        await auth.use('api').revoke();

        return { ok: true, message: 'Logged out.' };
    }
}
