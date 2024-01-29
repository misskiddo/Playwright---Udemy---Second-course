export class Navigation {
    constructor(page) {
        this.page = page
        this.checkoutLink = page.getByRole('link', { name: 'Checkout' })
        this.basketCounter = page.locator("[data-qa='header-basket-count']")
    }

    getBasketCount = async () => {
        return parseInt(await this.basketCounter.innerText())
    }

    clickCheckout = async () => {
        await this.checkoutLink.click()
        await this.page.waitForURL('/basket')
    }
}