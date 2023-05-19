class ecomPage {
	elements = {
		userNameInput: () => cy.get('#reg_username'),
		emailInput: () => cy.get('#reg_email'),
		passwordInput: () => cy.get('#reg_password'),
		registerButton: () => cy.get('[name="register"]'),
		loginUserName: () => cy.get('#username'),
		loginPassword: () => cy.get('#password'),
		loginButton: () => cy.get('[name="login"]'),
		accountName: () =>
			cy.get('.woocommerce-MyAccount-content > :nth-child(2) > :nth-child(1)'),
		searchIcon: () => cy.get('.noo-navbar-header .icon_search'),
		colorDropDown: () => cy.get('#pa_color'),
		searchBox: () => cy.get('.form-control'),
		sizeDropDown: () => cy.get('#pa_size'),
		addQty: () => cy.get('.qty-increase'),
		addToCart: () => cy.get('.single_add_to_cart_button'),
		cartIcon: () => cy.get('.cart-name-and-total'),
		cartNameTotal: () => cy.get('.cart-name-and-total'),
		checkout: () => cy.get('.wc-proceed-to-checkout > .checkout-button'),
		billingFirstName: () => cy.get('#billing_first_name'),
		billingLastName: () => cy.get('#billing_last_name'),
		streetAddr: () => cy.get('#billing_address_1'),
		city: () => cy.get('#billing_city'),
		postalCode: () => cy.get('#billing_postcode'),
		phone: () => cy.get('#billing_phone'),
		placeOrder: () => cy.get('#place_order'),
		terms: () => cy.get('#terms'),
		thankYouMsg: () => cy.get('.woocommerce-thankyou-order-received'),
	};

	typeUserName = uName => this.elements.userNameInput().type(uName);
	typeEmail = email => this.elements.emailInput().type(email);
	typePwd = pwd => this.elements.passwordInput().type(pwd);
	clickRegisterButton = () =>
		this.elements.registerButton().click({ force: true });
	clickOnSearch = () => this.elements.searchIcon().click();
	selectCoclor = color => this.elements.colorDropDown().select(color);
	searchForSpec = spec => this.elements.searchBox().type(spec);
	selectSize = size => this.elements.sizeDropDown().select(size);
	clickOnAddQty = () => this.elements.addQty().click();
}

module.exports = new ecomPage();
