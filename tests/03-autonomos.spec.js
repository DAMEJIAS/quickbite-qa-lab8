
const { test, expect } = require('@playwright/test');

test('R05 - No permite confirmar sin nombre de entrega', async ({ page }) => {
  await page.goto('/');

  // Agregar un producto al carrito
  await page.locator('[data-product]').first().click();

  // Intentar continuar sin proporcionar nombre de entrega
  await page.locator('#checkout').click();

  // La aplicación debería impedir la confirmación sin nombre.
  // Si permite continuar, la prueba debe fallar y revelar el defecto.
  await expect(page.locator('#message')).toContainText(
    /nombre.*(requerido|obligatorio)|ingrese.*nombre/i
  );
});

test('R06 - Búsqueda sin coincidencias', async ({ page }) => {
  await page.goto('/');

  await page.locator('#search').fill('producto-inexistente-987654');

  await expect(page.locator('#products').locator('[data-product]')).toHaveCount(0);
});


