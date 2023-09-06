import { faker } from "@faker-js/faker";

describe("Login", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  function inputLoginInfo({
    reservationId = '13694',
    password = 'qwerty',
  }) {
    cy.get('input[placeholder="Reservation ID"]').type(reservationId);
    cy.get('input[placeholder="Password"]').type(password);
  }

  it('Succeeds with correct credentials', function () {
    const reservationId = "13694";
    const password = "qwerty";

    inputLoginInfo({ reservationId, password });

    cy.get('button').contains('Login').click();
    cy.contains('田中太郎');
  });

  describe('Fails with wrong credentials', function () {
    for (let i = 1; i <= 5; i++) {
      it(`Fails with wrong credentials #${i}`, function () {
        const reservationId = faker.string.numeric(5);
        const password = faker.internet.password();

        inputLoginInfo({ reservationId, password });

        cy.get('button').contains('Login').click();
        cy.contains('Reservation id or password is incorrect');
      });
    }
  });
});