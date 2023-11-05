describe("Test for Div Text Content", () => {
  it("should contain the correct titles", () => {
    // Visit the page where your divs are located
    cy.visit("/site");

    // Define the titles you expect to find
    const expectedTitles = [
      "Inlet Works",
      "Band Screens and Aerated Grit Chamber",
    ];

    // Get all divs with the class "hotspot link-hotspot"
    cy.get("div.hotspot-tooltip").each(($div, index, $list) => {
      // Get the text, trim whitespace, and convert it to lowercase
      const divText = $div.text().trim();
      // Assert that the lowercase text of the div is included in the expected titles
      expect(expectedTitles).to.include(divText);
    });
  });
});
