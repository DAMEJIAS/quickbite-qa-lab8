
const { test, expect } = require('@playwright/test');

test('R01 - Rechaza credenciales incorrectas', async ({ page }) => {
  await page.goto('/');
  await page.locator('#user').fill('usuario_incorrecto');
  await page.locator('#password').fill('clave_incorrecta');
  await page.locator('#login').click();

  await expect(page.locator('#login-result')).toContainText(/incorrect|inválid|error|rechazad/i);
});

test('R02 - Filtra productos por búsqueda', async ({ page }) => {
  await page.goto('/');
  await page.locator('#search').fill('Pizza');

  await expect(page.locator('#products')).toContainText('Pizza');
  await expect(page.locator('#products')).not.toContainText('Tacos');
});

test('R03 - Actualiza contador del carrito', async ({ page }) => {
  await page.goto('/');

  await page.locator('[data-product]').first().click();
  await page.locator('[data-product]').nth(1).click();

  await expect(page.locator('#cart-count')).toHaveText('2');
});

test('R04 - Impide pedido sin productos', async ({ page }) => {
  await page.goto('/');
  await page.locator('#checkout').click();

  await expect(page.locator('#message')).toContainText(/vacío|vacía|producto/i);
});
