import { faker } from "@faker-js/faker";

function inputLoginInfo({
  reservationId = '13694',
  password = 'qwerty',
}) {
  cy.get('input[placeholder="Reservation ID"]').type(reservationId);
  cy.get('input[placeholder="Password"]').type(password);
}

function clickLoginButton() {
  cy.get('button').contains('Login').click();
}

describe("Login", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it('Succeeds with correct credentials', function () {
    const reservationId = "13694";
    const password = "qwerty";

    inputLoginInfo({ reservationId, password });
    clickLoginButton();
    cy.contains('田中太郎');
  });

  describe('Fails with wrong credentials', function () {
    for (let i = 1; i <= 5; i++) {
      it(`Fails with wrong credentials #${i}`, function () {
        const reservationId = faker.string.numeric(5);
        const password = faker.internet.password();

        inputLoginInfo({ reservationId, password });
        clickLoginButton();
        cy.contains('Reservation id or password is incorrect');
      });
    }
  });
});