describe("Login", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  const reservation_id = "13694";
  const password = "qwerty";

  it(`Succeeds with reservation id ${reservation_id} and password ${password}`, function () {
    cy.get('input[placeholder="Reservation ID"]').type(reservation_id);
    cy.get('input[placeholder="Password"]').type(password);
    cy.get('button').contains('Login').click();
    cy.contains('田中太郎');
  });

  for (let i = 0; i < 2; i++) {
    const reservation_id = Cypress.faker.string.numeric(5);
    const password = Cypress.faker.internet.password();

    it(`Fails with reservation id ${reservation_id} and password ${password}`, function () {
      cy.get('input[placeholder="Reservation ID"]').type(reservation_id);
      cy.get('input[placeholder="Password"]').type(password);
      cy.get('button').contains('Login').click();
      cy.contains('Reservation id or password is incorrect');
    });
  }
});
