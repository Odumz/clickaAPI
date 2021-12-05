import faker from 'faker'

// create seedUserPlans function to add the random userplans with random pproviders
const seedUserPlans = async (numOfUserPlans: number) => {
    const userplans = [];

    for (let i = 0; i < numOfUserPlans; i++) {
        const userplan  = {
            name: faker.random.word(),
            price: faker.datatype.number({ min: 9}),
            features: faker.random.words()
        };

        userplans.push(userplan);
    }

    return userplans;
};

export default {
    seedUserPlans
}