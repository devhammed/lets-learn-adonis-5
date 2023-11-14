import User from 'App/Models/User'
import ApiToken from 'App/Models/ApiToken'
import { BasePolicy, action } from '@ioc:Adonis/Addons/Bouncer'

export default class ApiTokenPolicy extends BasePolicy {
	@action({allowGuest: true})
	public async create(_user: User|null) {
		return true;
	}

	public async delete(user: User, apiToken: ApiToken) {
		return user.id === apiToken.userId;
	}
}
