import ApiToken from 'App/Models/ApiToken';
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import ApiTokensValidator from 'App/Validators/Api/V1/ApiTokensValidator';

export default class ApiTokensController {
    /**
     * Create a new user token.
     */
    public async store({response, request, auth, bouncer}: HttpContextContract) {
        return bouncer
            .with('ApiTokenPolicy')
            .authorize('create')
            .then(async () => {
                try {
                    const {email, password} = await request.validate(
                        ApiTokensValidator,
                    );

                    const {
                        token,
                        type,
                        expiresAt,
                    } = await auth
                        .use('api')
                        .attempt(email, password, {expiresIn: '30 days'});

                    return response.created({
                        ok: true,
                        data: {
                            token,
                            type,
                            expiresAt: expiresAt?.toUnixInteger(),
                        },
                    });
                } catch {
                    return response.unauthorized({
                        ok: false,
                        message: 'Invalid credentials.',
                    });
                }
            });
    }

    /**
     * Revoke user token.
     */
    public async destroy({params, bouncer, response}: HttpContextContract) {
        const apiToken = await ApiToken.findOrFail(params.id);

        await bouncer.with('ApiTokenPolicy').authorize('delete', apiToken);

        await apiToken.delete();

        return response.noContent();
    }
}
