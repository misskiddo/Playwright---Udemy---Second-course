import { expect } from "@playwright/test";
export class Checkout {
    constructor(page) {
        this.page = page;
        this.basketCards = page.locator('[data-qa="basket-card"]')
        this.basketItemPrice = page.locator('[data-qa="basket-item-price"]')
        this.removeFromBasket = page.locator('[data-qa="basket-card-remove-item"]')
    }

    removeCheapestProduct = async () => {
        await this.basketCards.first().waitFor()
        const itemsBeforeRemoval = await this.basketCards.count()
        await this.basketItemPrice.first().waitFor()
        const allPriceTexts = await this.basketItemPrice.allInnerTexts()
        console.warn({ allPriceTexts })
        // [ '499$', '599$', '320$' ]
        const prices = allPriceTexts.map((element) => {
            const withoutDollarSign = element.replace('$', '')
            return parseInt(withoutDollarSign)
        })

        const cheapestPrice = Math.min(...prices)
        const cheapestPriceIndex = prices.indexOf(cheapestPrice)

        await this.removeFromBasket.nth(cheapestPriceIndex).click()

        await expect(this.basketCards).toHaveCount(itemsBeforeRemoval - 1)
    }
}
