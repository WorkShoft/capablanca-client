it('Creates a game', () => {
  cy.visitApp();
  cy.logIn("mikel", "superdupermikel");
  cy.createGame();
});
