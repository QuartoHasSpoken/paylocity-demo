const faker = require('faker');

let database = {
  employees: [],
  dependents: []
};

for (let i = 1, j = 1; i <= 20; i++) {
  database.employees.push({
    id: i,
    lName: faker.name.lastName(),
    fName: faker.name.firstName(),
    title: faker.name.jobTitle(),
  });

  const depCount = getRandomInt(3);

  for (let k = 0; k < depCount; k++) {
      database.dependents.push({
        id: j,
        employeeId: i,
        fName: faker.name.firstName(),
      });
      j++;
  }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

console.log(JSON.stringify(database));
