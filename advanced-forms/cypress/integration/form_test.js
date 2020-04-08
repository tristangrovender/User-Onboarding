describe("Testing my form", function() {
    beforeEach(function() {
        cy.visit("http://localhost:3000");
    });
    it("Add test to form inputs and submit form", function() {
        cy.get("#name")
            .type("Tristan")
            .should("have.value", "Tristan");
        cy.get("#email")
            .type("tristangrovender@yahoo.com")
            .should("have.value", "tristangrovender@yahoo.com");
        cy.get("#password")
            .type("123")
            .should("have.value", "123");
        cy.get(".terms > input")
            .check()
            .should("be.checked");
        cy.get("button").click();
    });
    it("Test for invalid fields", function() {
        // cy.get("input:invalid").should("have.length", 0);
        cy.get("#email").type("not_an_email");
        cy.get("button")
            // .click()
            .should("be.disabled");
    });
});
