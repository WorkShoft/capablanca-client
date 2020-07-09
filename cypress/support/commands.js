Cypress.Commands.add("visitApp", () => {
  cy.visit("http://localhost:3000");
});

Cypress.Commands.add("logIn", (username, password) => {
  cy.get("[name='username']").type(username);
  cy.get("[name='password']").type(password);
  cy.get("button").click();
});

Cypress.Commands.add("logOut", () => {
  cy.get("#logoutButton").click();
});

Cypress.Commands.add("createGame", () => {
  cy.get("#newGame").click();
});

Cypress.Commands.add("movePiece", (fromSquare, toSquare) => {
  console.log(fromSquare);
  cy.get(`[square=${fromSquare}]`).click();  
  cy.get(`[square=${toSquare}]`).click();
})
