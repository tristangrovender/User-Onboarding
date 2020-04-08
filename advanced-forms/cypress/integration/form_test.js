describe("Testing my form", function() {
    beforeEach(function() {
        cy.visit("http://localhost:3000");
    });
    it("Add test to form inputs and submit form", function() {
        cy.get("#name")
            .type("Tristan")
            .should("have.value", "Tristan");
    });
});
