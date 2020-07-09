/*
An example of Fool's Mate consists of the moves:

    1. f3 e5
    2. g4 Qh4#
*/

const MOVES = ["f2f3", "e7e5", "g2g4", "d8h4"];

it("Plays Fool's Mate", () => {
  cy.visitApp();
  cy.logIn("mikel", "superdupermikel");
  cy.createGame();
  cy.get("#mainDiv").attribute("uuid").then((uuid) => {
    cy.logOut();    
    cy.logIn("mikel", "superdupermikel");

    cy.get("#joinGame").click();

    cy.get(`a[uuid=${uuid}]`).click({"force": true});

    for(let i of MOVES){
      cy.movePiece(i.slice(0, 2), i.slice(2, 4));
    }  
  });

});

