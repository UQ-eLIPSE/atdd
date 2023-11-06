// describe("Test for Div Text Content", () => {
//   it("should contain the correct titles", () => {
//     // Visit the page where your divs are located
//     cy.visit("/site");

//     // Define the titles you expect to find
//     const expectedTitles = [
//       "Inlet Works",
//       "Band Screens and Aerated Grit Chamber",
//     ];

//     //Click minimap

//     //click hotspot on minimap, navigate to a view

//     //retrieve the div collection 1 with class .hotspot .link-hotspot with "style= display: block" and a html element' HTML text with class names: hotspot-tooltip link-hotspot-tooltip

//     //retrieve the div collection 2 with class linkNodeNames and HTM text under the div with class link-node-list

//     //Compare collection 1 and 2 with numbers and HTML TXT should be the same

//     // Get all divs with the class "hotspot link-hotspot"
//     cy.get("div.hotspot-tooltip").each(($div, index, $list) => {
//       // Get the text, trim whitespace, and convert it to lowercase
//       const divText = $div.text().trim();
//       // Assert that the lowercase text of the div is included in the expected titles
//       expect(expectedTitles).to.include(divText);
//     });
//   });
// });
