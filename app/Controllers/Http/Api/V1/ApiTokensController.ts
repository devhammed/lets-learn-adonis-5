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
                const {email, password} = await request.validate(
                    ApiTokensValidator,
                );

                const {
                    tokenHash,
                    token,
                    type,
                    expiresIn
                } = await auth
                    .use('api')
                    .attempt(email, password, {expiresIn: '30d'});

                const { id } = await ApiToken.query()
                    .where('token', tokenHash)
                    .select('id')
                    .firstOrFail();

                return response.created({
                    data: {
                        id,
                        token,
                        type,
                        expiresIn,
                    },
                });
            });
    }

    /**
     * Destroy a user token.
     */
    public async destroy({params, bouncer, response}: HttpContextContract) {
        const apiToken = await ApiToken.findOrFail(params.id);

        await bouncer
            .with('ApiTokenPolicy')
            .authorize('delete', apiToken);

        await apiToken.delete();

        return response.noContent();
    }
}
