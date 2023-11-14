import { schema, rules } from '@ioc:Adonis/Core/Validator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UsersValidator {
    constructor(protected ctx: HttpContextContract) {}

    public schema = schema.create({
        name: schema.string({ trim: true }, [
            rules.required(),
            rules.minLength(2),
        ]),
        email: schema.string({ trim: true }, [
            rules.required(),
            rules.email(),
            rules.unique({ table: 'users', column: 'email' }),
        ]),
        password: schema.string({}, [
            rules.required(),
            rules.minLength(8),
            rules.confirmed(),
        ]),
    });
}
