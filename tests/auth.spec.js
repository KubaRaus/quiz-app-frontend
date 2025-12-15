import { test, expect } from "@playwright/test";

test.describe("Authentication", () => {
  test("should redirect to signin when accessing profile without login", async ({
    page,
  }) => {
    // Próba dostępu do profilu bez logowania
    await page.goto("http://localhost:3000/user/profile");

    // Powinien przekierować do strony logowania z parametrem returnUrl
    await expect(page).toHaveURL(/\/user\/signin/);
  });

  test("should login successfully and access profile", async ({ page }) => {
    // Przejdź do strony logowania
    await page.goto("http://localhost:3000/user/signin");

    // Wypełnij formularz logowania
    await page.getByLabel("Email").fill("jakubraus2001@gmail.com");
    await page.getByLabel("Hasło").fill("kuba2001");

    // Kliknij przycisk logowania
    await page.getByRole("button", { name: "Zaloguj" }).click();

    // Poczekaj aż użytkownik zostanie zalogowany - sprawdź przycisk Wyloguj
    await expect(page.getByRole("button", { name: "Wyloguj" })).toBeVisible({
      timeout: 15000,
    });

    // Teraz przejdź do profilu - powinno się udać
    await page.goto("http://localhost:3000/user/profile");

    // Sprawdź czy jesteśmy na stronie profilu (nie zostaliśmy przekierowani)
    await expect(page).toHaveURL("http://localhost:3000/user/profile");

    // Sprawdź czy formularz profilu jest widoczny
    await expect(page.getByLabel("Nazwa wyświetlana")).toBeVisible({
      timeout: 10000,
    });
  });

  test("should stay on profile after successful login via redirect", async ({
    page,
  }) => {
    // Próba dostępu do profilu bez logowania - zostaniemy przekierowani do logowania
    await page.goto("http://localhost:3000/user/profile");

    // Powinniśmy być na stronie logowania z returnUrl
    await expect(page).toHaveURL(/\/user\/signin\?returnUrl=/);

    // Zaloguj się
    await page.getByLabel("Email").fill("jakubraus2001@gmail.com");
    await page.getByLabel("Hasło").fill("kuba2001");
    await page.getByRole("button", { name: "Zaloguj" }).click();

    // Po zalogowaniu powinniśmy być przekierowani z powrotem do profilu
    await page.waitForURL("http://localhost:3000/user/profile");

    // Sprawdź czy jesteśmy na stronie profilu
    await expect(page).toHaveURL("http://localhost:3000/user/profile");
    await expect(page.getByLabel("Nazwa wyświetlana")).toBeVisible();
  });

  test("should show error with invalid credentials", async ({ page }) => {
    await page.goto("http://localhost:3000/user/signin");

    // Wypełnij formularz błędnymi danymi
    await page.getByLabel("Email").fill("wrong@example.com");
    await page.getByLabel("Hasło").fill("wrongpassword");
    await page.getByRole("button", { name: "Zaloguj" }).click();

    // Poczekaj na komunikat o błędzie
    await expect(page.getByText("Nieprawidłowy email lub hasło")).toBeVisible();
  });
});
