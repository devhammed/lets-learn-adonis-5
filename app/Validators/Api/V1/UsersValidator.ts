import { schema, rules } from '@ioc:Adonis/Core/Validator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UsersValidator {
    constructor(protected ctx: HttpContextContract) {}

    public schema = schema.create({
        name: schema.string([
            rules.trim(),
            rules.required(),
            rules.minLength(2),
        ]),
        email: schema.string([
            rules.required(),
            rules.email(),
            rules.trim(),
            rules.unique({ table: 'users', column: 'email' }),
        ]),
        password: schema.string([
            rules.required(),
            rules.minLength(8),
            rules.confirmed(),
        ]),
    });
}
