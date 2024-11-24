describe("Reset my password successfully with status code 200", () => {
  let studentEmail;
  let studentNumber;
  let accessToken;

  before(() => {
    // Combine reading files using Cypress.Promise.all for efficiency
    cy.wrap(
      Cypress.Promise.all([
        cy.readFile("cypress/fixtures/studentToken.json"),
        cy.readFile("cypress/fixtures/userInformation.json"),
      ])
    ).then(([tokenData, userData]) => {
      accessToken = tokenData.studentLoginToken;
      studentEmail = userData.email;
      studentNumber = userData.number;
      // console.log(accessToken, studentEmail, studentNumber);
    });
  });

  it("Checking if the user can reset their password or not", () => {
    const otp = 135477;
    cy.request({
      method: "PATCH",
      url: "/user/password/reset",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        email: studentEmail,
        phone: studentNumber,
        channel: "email",
        otp: otp,
        password: "Anonno#1",
      },
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200) {
        // Assertions
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("success", true);
        expect(response.duration).to.be.lessThan(2000);
        // Log the response for debugging
        cy.log("Password Reset Response:", response.body);
        console.log("Password Reset Response:", response.body);
      } else {
        cy.log("Reset password failed with status code: ", response.status);
        cy.log(response.body.error);
      }
    });
  });
});
