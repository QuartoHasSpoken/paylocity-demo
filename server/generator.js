const faker = require('faker');

let database = {
  employees: []
};

for (let i = 1, j = 1; i <= 20; i++) {
  const dependents = [];

  const depCount = getRandomInt(3);

  for (let k = 0; k < depCount; k++) {
    dependents.push(faker.name.firstName());
  }

  database.employees.push({
    id: i,
    lastName: faker.name.lastName(),
    firstName: faker.name.firstName(),
    dependents: dependents
  });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

console.log(JSON.stringify(database));
