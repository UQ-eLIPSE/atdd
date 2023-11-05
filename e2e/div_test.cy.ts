// describe("ATDD Test for Div Titles", () => {
//   it("should render all divs with their titles in the topbar", () => {
//     // Visit the site page
//     cy.visit("/site");

//     // Capture all divs with a certain title and class pattern
//     cy.get("div.hotspot.link-hotspot").then(($divs) => {
//       // Convert the jQuery object to an array to extract text content
//       const titles = $divs.toArray().map((div) => Cypress.$(div).text().trim());
//       console.log(titles); // Should print out all the titles from the divs

//       // Now check if these titles are rendered in the topbar section
//       cy.get(".link-node-list").should(($topbar) => {
//         const topbarTexts = $topbar
//           .find(".title-class")
//           .toArray()
//           .map((span) => Cypress.$(span).text().trim());

//         // Check that every title is also found in the topbarTexts array
//         titles.forEach((title) => {
//           expect(topbarTexts).to.include(title);
//         });
//       });

//       // Check the count of .title-class spans against the number of link-hotspot divs
//       cy.get(".link-node-list")
//         .find(".title-class")
//         .should("have.length", $divs.length);
//     });
//   });
// });
