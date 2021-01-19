beforeEach(() => {
  cy.visit('http://localhost:3000');
});

describe('User Form', () => {
  it('Can see login page at start', () => {
    cy.contains('Login to Chexpense');
  });

  it("Doesn't allow signup password mismatch", () => {
    cy.contains("Don't have an account? Signup").click();

    cy.get('input:first').type('cypress_tester');
    cy.get("input[placeholder='Password']").type('qqq');
    cy.get('input:last').type('123');

    cy.contains('SIGNUP').click();
    cy.contains('Please enter matching passwords');
  });

  it('Can switch to signup then create user', () => {
    cy.contains("Don't have an account? Signup").click();
    cy.contains('Signup to Chexpense');

    cy.get('input:first').type('cypress_tester');
    cy.get("input[placeholder='Password']").type('somepass');
    cy.get('input:last').type('somepass');
    cy.contains('SIGNUP').click();

    cy.contains('ADD EXPENSE');
  });
});

describe('Logged in', () => {
  beforeEach(() => {
    cy.get('input:first').type('cypress_tester');
    cy.get("input[placeholder='Password']").type('somepass');
    cy.contains('LOGIN').click();
  });

  it('Can add and delete expenses', () => {
    cy.get("input[placeholder='expense']").type(123);
    cy.contains('ADD EXPENSE').click();

    cy.contains('button', '123').click();
    cy.contains('button', '123').siblings().click();
    cy.contains('123').should('not.exist');
  });

  it("Can logout and can't signup with the same name", () => {
    cy.contains('Menu').click();
    cy.contains('Logout').click();
    cy.contains("Don't have an account? Signup").click();

    cy.get('input:first').type('cypress_tester');
    cy.get("input[placeholder='Password']").type('somepass');
    cy.get('input:last').type('somepass');
    cy.contains('SIGNUP').click();
    cy.contains('Username already exists');
  });

  it('Can delete account', () => {
    cy.contains('Menu').click();
    cy.contains('Delete Account').click();
    cy.contains('Login to Chexpense');

    cy.get('input:first').type('cypress_tester');
    cy.get("input[placeholder='Password']").type('somepass');
    cy.contains('LOGIN').click();
    cy.contains('Invalid credentials');
  });
});
