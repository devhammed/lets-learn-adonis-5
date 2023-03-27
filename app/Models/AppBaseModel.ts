import {
  BaseModel as AdonisBaseModel,
  beforeCreate,
  column,
} from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';
import { v4 as uuid4 } from 'uuid';

export class AppBaseModel extends AdonisBaseModel {
  public static selfAssignPrimaryKey = true;

  @column({ isPrimary: true })
  public id: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeCreate()
  public static assignUuid(model: AppBaseModel) {
    model.id = uuid4();
  }
}
