describe("Minimap Test", () => {
  it("should compare elements with .hotspot-tooltip and .linkNodeNames", () => {
    // Visit the page where your divs are located
    cy.visit("/");
    // Click a html element with attribute data-cy="minimap-small"
    cy.get('[data-cy="sb-site"]').click();
    cy.wait(500);
    cy.get('[data-cy="minimap-small"]').should("exist").click();
    // Click the first element with data-cy="node"
    cy.get("#34-img_4073-panorama").first().should("exist").click();

    // Retrieve the collection 1 of elements with .hotspot-tooltip that are visible
    cy.wait(1000);
    cy.get(".hotspot.link-hotspot")
      .find(".hotspot-tooltip")
      .filter((index, element) => {
        // Filter those elements based on a condition
        return Cypress.$(element).css("display") === "block";
      })
      .then(($collection1) => {
        // Retrieve the collection 2 of elements with .linkNodeNames
        cy.get(".linkButton").should("exist").click();
        cy.wait(1000);
        cy.get('[data-cy="link-node-names"]')
          .should("exist")
          .then(($collection2) => {
            // Wait for any asynchronous actions to complete before comparing the collections
            cy.wait(500); // Adjust the time according to your application's needs

            // Compare the length of both collections
            expect(
              $collection1.length,
              "number of visible .hotspot-tooltip elements"
            ).to.equal($collection2.length);
          });
      });
  });
});
