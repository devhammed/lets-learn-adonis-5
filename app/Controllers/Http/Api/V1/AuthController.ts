import User from 'App/Models/User';
import LoginValidator from 'App/Validators/Api/Auth/V1/LoginValidator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import RegisterValidator from 'App/Validators/Api/Auth/V1/RegisterValidator';

export default class AuthController {
  /**
   * Login a user.
   */
  public async login({ request, auth }: HttpContextContract) {
    const { email, password } = await request.validate(LoginValidator);

    try {
      const {
        token: value,
        type,
        user,
        expiresAt,
      } = await auth
        .use('api')
        .attempt(email, password, { expiresIn: '30 days' });

      return {
        ok: true,
        data: {
          token: {
            value,
            type,
            expiresAt: expiresAt!.toUnixInteger(),
          },
          user,
        },
      };
    } catch {
      return { ok: false, message: 'Invalid credentials.' };
    }
  }

  /**
   * Register a user.
   */
  public async register({ request, auth }: HttpContextContract) {
    const data = await request.validate(RegisterValidator);

    try {
      const user = await User.create(data);

      const {
        token: value,
        type,
        expiresAt,
      } = await auth.use('api').generate(user, { expiresIn: '30 days' });

      return {
        ok: true,
        data: {
          token: {
            value,
            type,
            expiresAt: expiresAt!.toUnixInteger(),
          },
          user,
        },
      };
    } catch {
      return { ok: false, message: 'Unable to register user.' };
    }
  }

  /**
   * Logout a user.
   */
  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke();

    return { ok: true, message: 'Logged out.' };
  }

  /**
   * Get current user's profile.
   */
  public async me({ auth }: HttpContextContract) {
    return { ok: true, data: auth.user };
  }
}
