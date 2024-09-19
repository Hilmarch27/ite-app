describe("auth spec", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("it should register new user and redirect to dashboard", () => {
    cy.visit("/signup");
    cy.get('[data-id="auth-title"]').contains(/Sign up/i);
    cy.get('[data-id="input-name"]').type("Hilman King");
    cy.get('[data-id="input-email"]').type("hilman.king@gmail.com");
    cy.get('[data-id="input-password"]').type("H!lM4N");
    cy.get('[data-id="btn-auth"] button')
      .contains(/Sign up/i)
      .click();
    cy.wait(1000)
    cy.get('[data-id="btn-logout"]')
      .should("exist")
      .should("have.text", "Logout");
    cy.get('[data-id="btn-logout"]').click();
    cy.wait(1000);
  });
  
  it("it should loggin and redirect to dashboard", () => {
    cy.visit("/signin");
    cy.get('[data-id="auth-title"]').contains(/Sign in/i);
    cy.get('[data-id="input-name"]').should('not.exist');
    cy.get('[data-id="input-email"]').type("hilman.king@gmail.com");
    cy.get('[data-id="input-password"]').type("H!lM4N");
    cy.get('[data-id="btn-auth"] button')
      .contains(/Sign in/i)
      .click();
    cy.wait(1000);
    cy.get('[data-id="btn-logout"]')
      .should("exist")
      .should("have.text", "Logout");
    cy.get('[data-id="btn-logout"]').click();
    cy.wait(1000);
    cy.request("POST", "http://localhost:3000/api/delete-users");
    cy.visit("/");
  });
});
