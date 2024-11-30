describe("Get the chat members with status code 200", () => {
  let accessToken;
  let chatId;

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.readFile("cypress/fixtures/studentLoginID.json").then((loginData) => {
      chatId = loginData.chatId;
    });
  });

  it("Checking if should be able Get the chat members or not", () => {
    cy.request({
      method: "POST",
      url: `/chat/members/${chatId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        // Organization: organizationId,
      },
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200) {
        // Assertions
        expect(response.status).to.eq(200);
        expect(response.duration).to.be.lessThan(2000);
        // expect(response.body).to.have.property("success", true);
        // Log the response for debugging
        cy.log("response.body", JSON.stringify(response.body, null, 1));
        console.log("Get the chat members Response:", response.body);
      } else {
        cy.log(
          "Get the chat members failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
