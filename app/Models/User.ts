import Hash from '@ioc:Adonis/Core/Hash';
import { AppBaseModel } from './AppBaseModel';
import { beforeSave, column } from '@ioc:Adonis/Lucid/Orm';

export default class User extends AppBaseModel {
  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }
}
