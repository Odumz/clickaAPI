import faker from 'faker'

// create seedUsers function to add the random users with random pproviders
const seedUsers = async (numOfUsers: number, providers: any) => {
    const users = [];

    for (let i = 0; i < numOfUsers; i++) {
        const user = {
            firstname: faker.name.firstName(),
            lastname: faker.name.firstName(),
            email: faker.internet.email(),
            phone: faker.datatype.number({ min: 9999999999, max: 99999999999999 }),
            password: faker.random.alphaNumeric()
        };

        users.push(user);
    }

    return users;
};

export default {
    seedUsers
}