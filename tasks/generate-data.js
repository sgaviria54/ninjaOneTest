import { faker } from '@faker-js/faker';

class CreateData {

    
    device = {
        name: faker.hacker.adjective() + '-' +faker.hacker.abbreviation(),
        capacity : faker.random.numeric('##'),
        type : Math.floor(Math.random() * 3)
    }

}

export const createData = new CreateData();