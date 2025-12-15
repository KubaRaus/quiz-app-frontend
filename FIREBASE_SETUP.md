# Instrukcja konfiguracji Firebase

## Krok 1: Tworzenie projektu Firebase

1. Przejdź do [Firebase Console](https://console.firebase.google.com/)
2. Kliknij "Add project" lub "Dodaj projekt"
3. Wprowadź nazwę projektu, np. "quiz-app"
4. (Opcjonalnie) Wyłącz Google Analytics jeśli nie jest potrzebny
5. Kliknij "Create project"

## Krok 2: Dodanie aplikacji Web

1. W Firebase Console, w Project Overview kliknij ikonę Web (`</>`)
2. Wprowadź nazwę aplikacji, np. "Quiz App Web"
3. **NIE** zaznaczaj "Firebase Hosting" (nie jest wymagany)
4. Kliknij "Register app"
5. **Skopiuj obiekt konfiguracji** - będzie wyglądał tak:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef",
};
```

## Krok 3: Konfiguracja Authentication

1. W menu bocznym wybierz **Build** → **Authentication**
2. Kliknij "Get started"
3. Wybierz "Email/Password" z listy dostawców
4. Włącz przełącznik "Email/Password"
5. **NIE** włączaj "Email link (passwordless sign-in)" - nie jest potrzebny
6. Kliknij "Save"

### Dodanie testowego użytkownika:

1. Przejdź do zakładki **Users**
2. Kliknij "Add user"
3. Wprowadź:
   - Email: `test@example.com`
   - Password: `test123456`
4. Kliknij "Add user"

## Krok 4: Konfiguracja Firestore

1. W menu bocznym wybierz **Build** → **Firestore Database**
2. Kliknij "Create database"
3. Wybierz lokalizację (np. `europe-west3` dla Polski)
4. Wybierz tryb:
   - **Development mode** (dla nauki/testów) - pozwala na odczyt/zapis bez autoryzacji
   - **Production mode** (zalecany) - wymaga konfiguracji reguł
5. Kliknij "Create"

### Konfiguracja reguł bezpieczeństwa (Production mode):

W zakładce **Rules** wklej następujące reguły:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Wyniki quizów - dostęp tylko dla właściciela
    match /quiz-results/{document} {
      allow read, write: if request.auth != null
                         && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null
                    && request.auth.uid == request.resource.data.userId;
    }

    // Zablokuj dostęp do innych kolekcji
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

Kliknij "Publish"

## Krok 5: Konfiguracja zmiennych środowiskowych

1. Otwórz plik `.env.local` w projekcie
2. Uzupełnij wartości danymi z Firebase Config (Krok 2):

```env
NEXT_PUBLIC_FIREBASE_API_KEY=Twój_API_Key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=twoj-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=twoj-project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=twoj-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=Twoj_Sender_ID
NEXT_PUBLIC_FIREBASE_APP_ID=Twoj_App_ID
```

3. **Ważne**: Upewnij się, że `.env.local` znajduje się w `.gitignore`

## Krok 6: Testowanie

1. Zainstaluj zależności (jeśli jeszcze nie):

   ```bash
   npm install firebase
   ```

2. Uruchom aplikację:

   ```bash
   npm run dev
   ```

3. Otwórz [http://localhost:3000](http://localhost:3000)

4. Przetestuj:
   - Rejestrację nowego użytkownika
   - Logowanie (użytkownik testowy: `test@example.com` / `test123456`)
   - Rozwiązanie quizu i sprawdź czy wynik zapisuje się w Firestore
   - Dostęp do chronionych stron

## Sprawdzenie zapisów w Firestore

1. W Firebase Console → Firestore Database
2. Powinna pojawić się kolekcja `quiz-results`
3. Po rozwiązaniu quizu przez zalogowanego użytkownika, zobaczysz dokumenty z wynikami

## Częste problemy

### Błąd: "Firebase: Error (auth/api-key-not-valid)"

- Sprawdź czy API Key w `.env.local` jest poprawny
- Upewnij się, że zmienne zaczynają się od `NEXT_PUBLIC_`

### Błąd: "Missing or insufficient permissions"

- Sprawdź reguły bezpieczeństwa w Firestore
- Upewnij się, że użytkownik jest zalogowany

### Błąd: "Failed to fetch"

- Sprawdź połączenie z internetem
- Upewnij się, że projekt Firebase istnieje i jest aktywny

## Dodatkowe zasoby

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Next.js + Firebase Guide](https://firebase.google.com/docs/web/setup)
