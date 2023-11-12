/*
Feature: LinkNode Information Consistency
As a user
I want to see consistent information in the 3D view and expanded left top bar
So that I can trust the data displayed is accurate

Scenario: Verify information consistency between hotspot tooltip and linkNode in 3D view
Given I am logged into the application
When I navigate to the 3D view page
And I click on a hotspot with displayed information
Then I should see matching information in the expanded left top bar
*/
describe("Test case: InforLinknode in Expanded Left Top Bar should match linkNode in 3D view", () => {
  it("should compare elements with .hotspot-tooltip and .linkNodeNames", () => {
    // Visit the page where your divs are located
    cy.visit("/", {
      // auth: {
      //   username: Cypress.env("username"),
      //   password: Cypress.env("password"),
      // },
    });

    cy.get('[data-cy="sb-site"]').click();
    cy.wait(1000);
    cy.get(".hotspot.link-hotspot")
      .filter((index, element) => {
        // Filter those elements based on a condition
        return Cypress.$(element).css("display") === "block";
      })
      .should("exist")
      .find(".hotspot-tooltip")
      .then(($collection1) => {
        // Map through each .hotspot-tooltip and get their inner HTML content
        const htmlCollection1 = $collection1
          .map((index, html) => html.innerHTML)
          .get();
        // Retrieve the collection 2 of elements with .linkNodeNames
        cy.get(".linkButton").should("exist").click();
        cy.wait(1000);
        cy.get(".linkNodeNames")
          .should("exist")
          .then(($collection2) => {
            // Map through each element in collection2 and get their inner HTML content
            const htmlCollection2 = $collection2
              .map((index, html) => html.textContent ?? "")
              .get();

            // Wait for any asynchronous actions to complete before comparing the collections
            cy.wait(500); // Adjust the time according to your application's needs

            // Log the HTML content for the first element in each collection for debugging
            cy.log(`Collection1 Element 0 HTML: ${htmlCollection1[0]}`);
            cy.log(`Collection2 Element 0 HTML: ${htmlCollection2[0]}`);

            // Comparing the length of both collections
            expect(
              htmlCollection1.length,
              "Both collections should have the same number of elements",
            ).to.equal(htmlCollection2.length);

            // Continue with comparison content
            htmlCollection1.forEach((html, index) => {
              expect(html.trim()).to.equal(
                htmlCollection2[index].trim(),
                `HTML content of element ${index} should match`,
              );
            });
          });
      });
  });
});
