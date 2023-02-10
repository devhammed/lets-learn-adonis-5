import { DateTime } from 'luxon';
import { v4 as uuid4 } from 'uuid';
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm';

export default class User extends BaseModel {
  public static selfAssignPrimaryKey = true;

  @column({ isPrimary: true })
  public id: string;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeCreate()
  public static assignUuid(user: User) {
    user.id = uuid4();
  }
}
