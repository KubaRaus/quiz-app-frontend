import { test, expect } from "@playwright/test";

test("has link to login page", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  // Symulacja kliknięcia na link z tekstem "Zaloguj", przejście do strony logowania
  await page.click("text=Zaloguj");

  // Sprawdzenie, czy została otwarta strona ze ścieżką do formularza logowania
  await expect(page).toHaveURL("http://localhost:3000/user/signin");

  // Sprawdzenie, czy na stronie logowania jest nagłówek z tekstem "Zaloguj się"
  await expect(page.locator("h2")).toContainText("Zaloguj się");
});

test("redirects unauthorized users to login page when accessing protected routes", async ({
  page,
}) => {
  // Test 1: Dostęp do profilu bez logowania
  await page.goto("http://localhost:3000/user/profile");

  // Powinien przekierować do strony logowania z parametrem returnUrl
  await expect(page).toHaveURL(/\/user\/signin\?returnUrl=/);
  await expect(page.locator("h2")).toContainText("Zaloguj się");

  // Test 2: Dostęp do zmiany hasła bez logowania
  await page.goto("http://localhost:3000/user/changepassword");

  // Powinien przekierować do strony logowania
  await expect(page).toHaveURL(/\/user\/signin/);
  await expect(page.locator("h2")).toContainText("Zaloguj się");

  // Test 3: Dostęp do wyników quizów bez logowania
  await page.goto("http://localhost:3000/quiz-results");

  // Powinien przekierować do strony logowania
  await expect(page).toHaveURL(/\/user\/signin/);
  await expect(page.locator("h2")).toContainText("Zaloguj się");
});
