import User from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory
    .define(User, ({ faker }) => {
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();

        return {
          name: [firstName, lastName].join(' '),
          email: faker.internet.email(firstName, lastName),
          password: 'password',
        };
    })
    .build();
