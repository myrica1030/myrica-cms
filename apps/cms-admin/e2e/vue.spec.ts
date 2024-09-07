import { expect, test } from '@playwright/test'

// TOOD: add playwright e2e config

// See here how to get started:
// https://playwright.dev/docs/intro
test('visits the app root url', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('div.greetings > h1')).toHaveText('You did it!')
})
