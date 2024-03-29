import {DateTime} from 'luxon';
import Hash from '@ioc:Adonis/Core/Hash';
import ApiToken from 'App/Models/ApiToken';
import {
    BaseModel,
    HasMany,
    column,
    hasMany,
    beforeSave,
} from '@ioc:Adonis/Lucid/Orm';

export default class User extends BaseModel {
    @column({isPrimary: true})
    public id: number;

    @column()
    public name: string;

    @column()
    public email: string;

    @column({serializeAs: null})
    public password: string;

    @column.dateTime({autoCreate: true})
    public createdAt: DateTime;

    @column.dateTime({autoCreate: true, autoUpdate: true})
    public updatedAt: DateTime;

    @hasMany(() => ApiToken)
    public apiTokens: HasMany<typeof ApiToken>;

    @beforeSave()
    public static async hashPassword(user: User) {
        if (user.$dirty.password) {
            user.password = await Hash.make(user.password);
        }
    }
}
