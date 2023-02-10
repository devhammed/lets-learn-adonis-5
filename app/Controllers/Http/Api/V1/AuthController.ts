import LoginValidator from 'App/Validators/Api/Auth/V1/LoginValidator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import RegisterValidator from 'App/Validators/Api/Auth/V1/RegisterValidator';
import User from 'App/Models/User';

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
        expiresIn,
      } = await auth.use('api').attempt(email, password);

      return {
        ok: true,
        data: {
          token: {
            value,
            type,
            expiresIn,
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
    const { email, password } = await request.validate(RegisterValidator);

    try {
      const user = await User.create({ email, password });

      const {
        token: value,
        type,
        expiresIn,
      } = await auth.use('api').generate(user);

      return {
        ok: true,
        data: {
          token: {
            value,
            type,
            expiresIn,
          },
          user,
        },
      };
    } catch {
      return { ok: false, message: 'Unable to register user.' };
    }
  }
}
