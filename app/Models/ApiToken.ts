import { DateTime } from 'luxon';
import User from 'App/Models/User';
import { BaseModel, BelongsTo, column, belongsTo } from '@ioc:Adonis/Lucid/Orm';

export default class ApiToken extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public userId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;
}
