/**
Test Case: Consistency of Infobar Content with LinkNode on Scene
Given: There is one active scene.
When: The scene is being viewed.
Then: The information displayed in the infobar should be identical to the information associated with the linkNode present in the scene.
*/
describe("Test case: Given one scene, infobar should contain same information with linkNode on the scene", () => {
  it("should compare elements with .hotspot-tooltip and .linkNodeNames", () => {
    // Visit the page where your hotspots are located
    cy.visit("/site", {
      // auth: {
      //   username: Cypress.env("username"),
      //   password: Cypress.env("password"),
      // },
    });

    // First, give a scene name, change the ID name if test different scene
    cy.get("#29-img_4039-panorama").click();

    // Second, get all hotspot visible on new scene
    cy.get(".hotspot.link-hotspot")
      .filter((index, element) => {
        const grandparent = Cypress.$(element).parent().parent();
        // Make sure the grandparent element exists before trying to access its style
        return grandparent.length > 0 && grandparent.css("display") === "block";
      })
      // .not("#firstVisibleHotspot") // Exclude the first visible element that was clicked
      .find(".hotspot-tooltip")
      .then(($collection1) => {
        // Map through each .hotspot-tooltip and get their inner HTML content
        const htmlCollection1 = $collection1
          .map((index, html) => html.innerHTML)
          .get();
        // Retrieve the collection 2 of elements with .linkNodeNames
        cy.get(".linkButton").should("exist").click();
        cy.get(".linkNodeNames")
          .should("exist")
          .then(($collection2) => {
            // Map through each element in collection2 and get their inner HTML content
            const htmlCollection2 = $collection2
              .map((index, html) => html.textContent ?? "")
              .get();

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
              try {
                expect(html.trim()).to.equal(
                  htmlCollection2[index].trim(),
                  `HTML content of element ${index} should match`,
                );
              } catch (e) {
                console.error(`Error in element ${index}:`, e);
                console.log(
                  `Collection1 Element ${index} HTML: ${htmlCollection1[index]}`,
                );
                console.log(
                  `Collection2 Element ${index} HTML: ${htmlCollection2[index]}`,
                );
                throw e; // rethrow the error so Cypress knows the test failed
              }
            });
          });
      });
  });
});
