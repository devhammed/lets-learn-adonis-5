import User from 'App/Models/User'
import ApiToken from 'App/Models/ApiToken'
import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'

export default class ApiTokenPolicy extends BasePolicy {
	public async create(_user: User) {
		return true;
	}

	public async delete(user: User, apiToken: ApiToken) {
		return user.id === apiToken.userId;
	}
}
