import { expect } from "@playwright/test"
import { Navigation } from "./Navigation"

export class ProductsPage {
    constructor(page) {
        this.page = page
        this.addButtons = page.locator("[data-qa='product-button']")
    }

    visit = async () => {
        await this.page.goto('/')
    }

    addProductToBasket = async (index) => {
        const navigation = new Navigation(this.page);
        const addButton = this.addButtons.nth(index)
        const basketValueBeforeAdding = await navigation.getBasketCount()
        await expect(addButton).toHaveText("Add to Basket")
        await addButton.click()
        await expect(addButton).toHaveText("Remove from Basket")
        const basketValueAfterAdding =await navigation.getBasketCount()
        expect (basketValueAfterAdding).toBe(basketValueBeforeAdding + 1)
    }
}