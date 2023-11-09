describe("Click and Compare", () => {
  it("clicks each .someclass element and then compares", () => {
    // Visit the page where the elements exist
    cy.visit("/site");

    // Get all elements with the class '.someclass'
    cy.get("[class^='_minimap_node']").then(($elements) => {

        // Use .map() to retrieve the 'data-cy' or any unique identifier for each element.
//   const elementIdentifiers = $elements.map((index, el) => Cypress.$(el).attr('data-cy')).get();
      //   //   // Iterate over each element
      $elements.each((index, element) => {
        
        // Log the HTML of the element
    cy.wrap(element).invoke('html').then((html) => {
        cy.log(`Element ${index} HTML: ${html}`);
      });
      // Log a specific data attribute, e.g., 'data-id'
      cy.wrap(element).invoke('attr', 'data-id').then((dataId) => {
        cy.log(`Element ${index} data-id: ${dataId}`);
      });
  
        cy.wrap(element)
          .click({ force: true })
          .then(() => {
            cy.wait(2000);
            performChecks();
            // cy.wait(2000);
            // cy.go('back');
          });
        //     //     // If clicking takes you to a new page, navigate back to the original list here
        //     //     cy.go('back'); // Uncomment if you need to go back after each click
      });
    });
    // cy.get("[data-cy='node']")
    //   .eq(2)
    //   .click({ force: true })
    //   .then(() => {
    //     performChecks();
    //   });

    // cy.get("#30-img_4045-panorama")
    //   .click({ force: true })
    //   .then(() => {
    // Second, get all hotspot visible on new scene
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
        // .not("#firstVisibleHotspot") // Exclude the first visible element that was clicked
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
                  "The .linkButton contains the .fas.fa-chevron-up icon, not clicking."
                );
              }
            });

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
                "Both collections should have the same number of elements"
              ).to.equal(htmlCollection2.length);

              // Continue with comparison content
              htmlCollection1.forEach((html, index) => {
                try {
                  expect(html.trim()).to.equal(
                    htmlCollection2[index].trim(),
                    `HTML content of element ${index} should match`
                  );
                } catch (e) {
                  console.error(`Error in element ${index}:`, e);
                  console.log(
                    `Collection1 Element ${index} HTML: ${htmlCollection1[index]}`
                  );
                  console.log(
                    `Collection2 Element ${index} HTML: ${htmlCollection2[index]}`
                  );
                  throw e; // rethrow the error so Cypress knows the test failed
                }
              });
            });
        });
    }
  });
});

//   function performChecks() {
//     cy.wait(1000);
//     // Extract the tooltips' HTML content
//     cy.get(".hotspot.link-hotspot")
//       .filter((index, element) => {
//         const $element = Cypress.$(element);
//         const grandparent = $element.parent().parent();
//         return (
//           $element.css("display") === "block" &&
//           grandparent.css("display") === "block"
//         );
//       })
//       // .not("#firstVisibleHotspot") // Exclude the first visible element that was clicked
//       .find(".hotspot-tooltip")
//       .then(($collection1) => {
//         // Map through each .hotspot-tooltip and get their inner HTML content
//         cy.wait(1000);
//         // Log details of the second clicked element
//         cy.log(`Clicked element 1: ${$collection1.eq(1).html()}`);
//         const htmlCollection1 = $collection1
//           .map((index, html) => html.innerHTML)
//           .get();
//         // Retrieve the collection 2 of elements with .linkNodeNames
//         cy.get(".linkButton")
//           .should("exist")
//           .then(($linkButton) => {
//             // Check if the .linkButton contains an icon with the class 'fas fa-chevron-up'
//             if ($linkButton.find(".fas.fa-chevron-up").length === 0) {
//               // If it does not contain the icon, click the button
//               cy.wrap($linkButton).click();
//             } else {
//               // If it contains the icon, log a message and do not click
//               cy.log(
//                 "The .linkButton contains the .fas.fa-chevron-up icon, not clicking."
//               );
//             }
//           });

//         cy.wait(2000);
//         cy.get(".linkNodeNames")
//           .should("exist")
//           .then(($collection2) => {
//             // Map through each element in collection2 and get their inner HTML content
//             const htmlCollection2 = $collection2
//               .map((index, html) => html.textContent ?? "")
//               .get();

//             // Log the length of the second collection
//             cy.log(`Length of Collection 2: ${htmlCollection2.length}`);
//             // Wait for any asynchronous actions to complete before comparing the collections
//             //   cy.wait(5000); // Adjust the time according to your application's needs

//             // Log the HTML content for the first element in each collection for debugging
//             cy.log(`Collection1 Element 0 HTML: ${htmlCollection1[0]}`);
//             cy.log(`Collection2 Element 0 HTML: ${htmlCollection2[0]}`);

//             // Comparing the length of both collections
//             expect(
//               htmlCollection1.length,
//               "Both collections should have the same number of elements"
//             ).to.equal(htmlCollection2.length);
//             // Continue with comparison content
//             htmlCollection1.forEach((html, index) => {
//               try {
//                 expect(html.trim()).to.equal(
//                   htmlCollection2[index].trim(),
//                   `HTML content of element ${index} should match`
//                 );
//               } catch (e) {
//                 console.error(`Error in element ${index}:`, e);
//                 console.log(
//                   `Collection1 Element ${index} HTML: ${htmlCollection1[index]}`
//                 );
//                 console.log(
//                   `Collection2 Element ${index} HTML: ${htmlCollection2[index]}`
//                 );
//                 throw e; // rethrow the error so Cypress knows the test failed
//               }
//             });
//           });
//         // cy.wait(1000);
//         // cy.get(".linkButton").should("exist").click();
//       });
//   }
// });
