import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator';

export default class UsersValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string({}, [rules.minLength(8), rules.confirmed()]),
  });

  public messages: CustomMessages = {};
}
