describe("First Reservation", () => {
  let name, prefecture, street;
  beforeEach(() => {
    cy.fixture('names').then((names) => {
      name = Cypress.faker.helpers.arrayElement(names.split('\n'));
    });
    cy.fixture('addresses').then((address) => {
      address = Cypress.faker.helpers.arrayElement(address.split('\n'));
      prefecture = address.split(',')[0];
      street = address.split(',')[1];
    });
    cy.visit("/firstRsvp");
  });

  const vaccination_id = "200000000004";
  const telephone = Cypress.faker.phone.number('###########');
  const birthdate = Cypress.faker.date.birthdate({ min: 1900, max: 2005, mode: 'year' });
  const year = birthdate.getFullYear();
  const month = birthdate.getMonth() + 1;
  const date = birthdate.getDate();

  it(`Succeeds with vaccination id ${vaccination_id}`, function () {
    cy.get('input[placeholder="Location Code"]').type('040002');
    cy.get('input[placeholder="Vaccination ID"]').type('200000000004');
    cy.get('input[placeholder="Zip Code"]').type('1000000');

    cy.get('input[name="prefecture"]').type(prefecture);
    cy.get('li[data-option-index="0"]').click();
    cy.get('input[placeholder="Address"]').type(street);
    cy.get('input[placeholder="Name"]').type(name);
    cy.get('input[placeholder="Telephone"]').type(telephone);

    cy.get('input[name="year"]').type(year);
    cy.get('li[data-option-index="0"]').click();
    cy.get('input[name="month"]').type(month);
    cy.get('li[data-option-index="0"]').click();
    cy.get('input[name="day"]').type(date);
    cy.get('li[data-option-index="0"]').click();

    cy.get('button').contains('Next').click();

    cy.contains('Choose Place & Date');
  });
});
