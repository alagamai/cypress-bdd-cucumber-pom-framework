// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import { faker } from '@faker-js/faker';
const ecomPage = require('../e2e/PageObjects/ecom-pom');

Cypress.Commands.add('register', data => {
	cy.visit(Cypress.env('APPURL'));
	ecomPage.typeUserName(data[0].uName);
	ecomPage.typeEmail(data[0].email);
	ecomPage.typePwd(data[0].password);
	ecomPage.clickRegisterButton();
	ecomPage.elements.accountName().then(t => {
		console.log('returned text **** : ' + t.text());
		expect(t.text()).to.be.equal(data[0].uName);
	});
	cy.get('.woocommerce-MyAccount-content > :nth-child(2) > a').click();
});

Cypress.Commands.add('generate_fixture_file', () => {
	const arr = [];
	const fullName = faker.name.fullName();
	const empInfo = {
		uName: fullName,
		email: faker.internet.email(fullName),
		password: 'TestDemo@123',
	};
	arr.push(empInfo);
	console.log(arr);
	cy.writeFile('./cypress/fixtures/testdata.json', arr);
});

Cypress.Commands.add('login', () => {
	cy.session(
		globalThis.data[0].uName,
		() => {
			cy.visit(Cypress.env('APPURL'));
			cy.wait(2000);
			ecomPage.elements.loginUserName().type(globalThis.data[0].uName);
			cy.wait(2000);
			ecomPage.elements.loginPassword().type(globalThis.data[0].password);
			cy.wait(2000);
			ecomPage.elements.loginButton().click();
			cy.wait(4000);
		}
		//	{
		// validate() {
		// 	ecomPage.elements.accountName().then(t => {
		// 		console.log('Account Name !!!! : ' + t.text());
		// 		expect(t.text()).to.be.equal(globalThis.data[0].uName);
		// 	});
		// },
		//	};
	);
});
