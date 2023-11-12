describe("Verify that when a user clicks all nodes on the minimap, application correctly populates the top-left-div with a list that matches the names of the hotspots present in the current scene", () => {
  it("clicks each mininode element and then compares", () => {
    // Visit the page where the elements exist
    cy.visit("/site", {
      // auth: {
      //   username: Cypress.env("username"),
      //   password: Cypress.env("password"),
      // },
    });

    // Get all elements with the class '.someclass'
    cy.get("[class^='_minimap_node']").then(($elements) => {
      // Use .map() to retrieve the 'data-cy' or any unique identifier for each element.
      // const elementIdentifiers = $elements.map((index, el) => Cypress.$(el).attr('data-cy')).get();
      //  Iterate over each element
      // Use .slice() to get only the first 5 elements
      const firstFiveElements = $elements.slice(0, 5);
      firstFiveElements.each((index, element) => {
        // Log the HTML of the element
        cy.wrap(element)
          .invoke("html")
          .then((html) => {
            cy.log(`Element ${index} HTML: ${html}`);
          });
        // Log a specific data attribute, e.g., 'data-id'
        cy.wrap(element)
          .invoke("attr", "data-id")
          .then((dataId) => {
            cy.log(`Element ${index} data-id: ${dataId}`);
          });

        cy.wrap(element)
          .click({ force: true })
          .then(() => {
            performChecks();
          });
      });
    });

    function performChecks() {
      cy.get(".hotspot.link-hotspot")
        .filter((index, element) => {
          const $element = Cypress.$(element);
          const grandparent = $element.parent().parent();
          return (
            $element.css("display") === "block" &&
            grandparent.css("display") === "block"
          );
        })
        .find(".hotspot-tooltip")
        .then(($collection1) => {
          // Map through each .hotspot-tooltip and get their inner HTML content
          const htmlCollection1 = $collection1
            .map((index, html) => html.innerHTML)
            .get();
          // Retrieve the collection 2 of elements with .linkNodeNames
          //   cy.get(".linkButton").should("exist").click();
          cy.get(".linkButton")
            .should("exist")
            .then(($linkButton) => {
              // Check if the .linkButton contains an icon with the class 'fas fa-chevron-up'
              if ($linkButton.find(".fas.fa-chevron-up").length === 0) {
                // If it does not contain the icon, click the button
                cy.wrap($linkButton).click();
              } else {
                // If it contains the icon, log a message and do not click
                cy.log(
                  "The .linkButton contains the .fas.fa-chevron-up icon, not clicking.",
                );
              }
            });

          cy.get(".linkNodeNames")
            .should("exist")
            .then(($collection2) => {
              // Map through each element in collection2 and get their inner HTML content
              const htmlCollection2 = $collection2
                .map((index, html) => html.textContent ?? "")
                .get();
              // Log the HTML content for the first element in each collection for debugging
              cy.log(`Collection1 Element 0 HTML: ${htmlCollection1}`);
              cy.log(`Collection2 Element 0 HTML: ${htmlCollection2}`);

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
    }
  });
});
