const ecomPage = require('../PageObjects/ecom-pom');
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { faker } from '@faker-js/faker';

before(() => {
	cy.generate_fixture_file();
	cy.fixture('testdata.json').then(data => {
		globalThis.data = data;
		cy.register(globalThis.data);
	});
});

beforeEach(() => {
	cy.login();
});

Given('I am on account page for Tools QA', () => {
	cy.visit(Cypress.env('APPURL'));
});

When('I do the search for shirts with below specifications', dataTable => {
	const data = dataTable.hashes();
	const actualLength = data.length;
	for (let row = 1; row <= actualLength; row++) {
		ecomPage.clickOnSearch({ force: true });
		console.log('table value 1 *** ' + dataTable.rawTable[row][0]);
		ecomPage.searchForSpec(`${dataTable.rawTable[row][0]}{enter}`);
		ecomPage.selectCoclor(dataTable.rawTable[row][2]);
		ecomPage.selectSize(dataTable.rawTable[row][1]);
		console.log('quantities ***** : ' + dataTable.rawTable[row][3]);
		for (let index = 1; index < dataTable.rawTable[row][3]; index++) {
			ecomPage.clickOnAddQty();
		}
		ecomPage.elements.addToCart().click();
	}
});

Then(
	'I do the verification on the Cart Page that it contains "blue denim" and "playboy"',
	() => {
		ecomPage.elements.cartNameTotal().click();
	}
);

When('I checkout the order items', () => {
	ecomPage.elements.cartIcon().click();
	ecomPage.elements.checkout().click();
});

When('I enter all the billing details and then place the order', dataTable => {
	// | BillingFirstName | BillingLastName | StreetAddress | City | PostalCode | Phone |
	// | Aashish | Khetarpal | 77 | Gurgaon | 122001 | 7777777777 |

	const data1 = dataTable.hashes();
	const actualLength = data1.length;
	for (let row = 1; row <= actualLength; row++) {
		ecomPage.elements.billingFirstName().type(dataTable.rawTable[1][0]);
		ecomPage.elements.billingLastName().type(dataTable.rawTable[1][1]);
		ecomPage.elements.streetAddr().type(dataTable.rawTable[1][2]);
		ecomPage.elements.city().type(dataTable.rawTable[1][3]);
		ecomPage.elements.postalCode().type(dataTable.rawTable[1][4]);
		ecomPage.elements.phone().type(dataTable.rawTable[1][5]);
	}
	ecomPage.elements.terms().check();

	ecomPage.elements.placeOrder().click();
});

Then('I verify that order has been successfully placed', () => {
	ecomPage.elements
		.thankYouMsg()
		.should('contain', 'Thank you. Your order has been received.');
});
