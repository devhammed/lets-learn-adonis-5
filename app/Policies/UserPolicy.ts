import User from 'App/Models/User';
import {BasePolicy, action} from '@ioc:Adonis/Addons/Bouncer';

export default class UserPolicy extends BasePolicy {
    public async view(user: User, model: User) {
        return user.id === model.id;
    }

    @action({allowGuest: true})
    public async create(user: User | null) {
        return !user;
    }

    public async update(user: User, model: User) {
        return user.id === model.id;
    }
}
