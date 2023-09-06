import { faker } from "@faker-js/faker";

function inputFirstReservationInfo() {
  const vaccinationId = faker.number.int({ min: 220000000000, max: 239999999999 });

  cy.get('input[placeholder="Location Code"]').type('040002');
  cy.get('input[placeholder="Vaccination ID"]').type(vaccinationId);
  cy.get('input[placeholder="Zip Code"]').type('1000000');
  cy.get('input[name="prefecture"]').type('宮城県');
  cy.get('li[data-option-index="0"]').click();
  cy.get('input[placeholder="Address"]').type('仙台市青葉区国分町３丁目７−１');
  cy.get('input[placeholder="Name"]').type('山田太郎');
  cy.get('input[placeholder="Telephone"]').type('0222611111');
  cy.get('input[name="year"]').type('2000');
  cy.get('li[data-option-index="0"]').click();
  cy.get('input[name="month"]').type('1');
  cy.get('li[data-option-index="0"]').click();
  cy.get('input[name="day"]').type('1');
  cy.get('li[data-option-index="0"]').click();
}

function clickNextButton() {
  cy.get('button').contains('Next').click();
}

function selectPlace() {
  cy.get('main img').eq(1).click();
}

function selectDate() {
  cy.get('main').contains(/^11$/g).click();
  cy.get('main').contains(/^10:00/g).click();
}

function inputPasswordInfo({
  password,
  confirmPassword,
}) {
  cy.get('input[placeholder="Password"]').type(password);
  cy.get('input[placeholder="Confirmed Password"]').type(confirmPassword);
}

function clickDataProtectionCheckbox() {
  cy.contains('Handling of personal information').parent().get('input[type="checkbox"]').check();
}

function clickReservationButton() {
  cy.get('button').contains('Reservation').click();
}

describe("Confirm Password", () => {
  beforeEach(() => {
    cy.visit("/firstRsvp");
    inputFirstReservationInfo();
    clickNextButton();
    cy.get('main').should('not.contain', 'Vaccination id is invalid');
    selectPlace();
    selectDate();
  });

  it('Fails with mismatching passwords', function () {
    let password, confirmPassword;
    do {
      password = faker.internet.password();
      confirmPassword = faker.internet.password();
    } while (password === confirmPassword);

    inputPasswordInfo({ password, confirmPassword });
    clickReservationButton();
    cy.contains('Confirmation password is incorrect');
  });

  it.only('Succeeds with matching passwords', function () {
    let password = faker.internet.password();

    inputPasswordInfo({ password, confirmPassword: password })
    clickDataProtectionCheckbox();
    clickReservationButton();
    cy.contains('Complete Reservation');
  });
});