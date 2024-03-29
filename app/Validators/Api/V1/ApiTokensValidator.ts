import { schema, rules } from '@ioc:Adonis/Core/Validator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class ApiTokensValidator {
    constructor(protected ctx: HttpContextContract) {}

    public schema = schema.create({
        email: schema.string([
            rules.trim(),
            rules.required(),
            rules.email(),
        ]),
        password: schema.string([
            rules.required(),
            rules.minLength(8),
        ]),
    });
}
