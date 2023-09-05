import { faker } from "@faker-js/faker";

describe("Login", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  const reservation_id = "13694";
  const password = "qwerty";

  /* ==== Test Created with Cypress Studio ==== */
  it(`Succeeds with reservation id ${reservation_id} and password ${password}`, function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.get(
      ":nth-child(3) > :nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > #outlined-full-width",
    ).type(reservation_id);
    cy.get(
      ":nth-child(4) > :nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > #outlined-full-width",
    ).type(password);
    cy.get(".MuiButtonBase-root").click();
    cy.get("tbody > :nth-child(1) > :nth-child(2)").contains("田中太郎様");
    /* ==== End Cypress Studio ==== */
  });

  for (let i = 0; i < 2; i++) {
    const reservation_id = faker.string.numeric(5);
    const password = faker.internet.password();

    /* ==== Test Created with Cypress Studio ==== */
    it(`Fails with reservation id ${reservation_id} and password ${password}`, function () {
      /* ==== Generated with Cypress Studio ==== */
      cy.get(
        ":nth-child(3) > :nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > #outlined-full-width",
      ).type(reservation_id);
      cy.get(
        ":nth-child(4) > :nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > #outlined-full-width",
      ).type(password);
      cy.get(".MuiButtonBase-root").click();
      cy.wait(1000);
      cy.document().contains("Reservation id or password is incorrect");
      /* ==== End Cypress Studio ==== */
    });
  }
  // 13024
  // 13694
  // 14044
});
