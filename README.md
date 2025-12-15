# Quiz App - Aplikacja Quizowa

Interaktywna aplikacja webowa do tworzenia i rozwiązywania quizów, stworzona z wykorzystaniem Next.js, Firebase i Tailwind CSS.

## 📋 Opis projektu

Aplikacja quizowa spełniająca wszystkie wymagania projektu zaliczeniowego:

### Wymagania spełnione:

- ✅ **Uwierzytelnianie użytkowników** - Firebase Authentication (email/hasło)
- ✅ **Autoryzacja** - chronione trasy dostępne tylko dla zalogowanych użytkowników
- ✅ **Responsywne stylowanie** - Tailwind CSS z obsługą mobile, tablet, desktop
- ✅ **Strona o autorze i aplikacji** - dedykowana strona `/about`
- ✅ **Zapis danych** - Firestore do przechowywania wyników quizów
- ✅ **Prezentacja komponentów** - strona `/quiz` z demonstracją wszystkich typów pytań

### Typy pytań quizowych:

1. **Pojedynczy wybór** - opcje tekstowe lub obrazkowe, jedna poprawna odpowiedź
2. **Wielokrotny wybór** - wiele poprawnych odpowiedzi
3. **Uzupełnianie luk** - wybór słów z listy opcji
4. **Dopasowywanie par** - łączenie powiązanych elementów

## 🚀 Technologie

- **Next.js 16** - Framework React z App Router
- **Tailwind CSS** - Stylowanie (komponenty z Tailblocks.cc)
- **Firebase** - Authentication & Firestore Database
- **React Context API** - Zarządzanie stanem uwierzytelniania

## 📁 Struktura projektu

```
frontend-laboratory-app/
├── app/
│   ├── (public)/
│   │   └── user/
│   │       ├── signin/          # Strona logowania
│   │       └── register/        # Strona rejestracji
│   ├── (protected)/
│   │   ├── layout.js           # Layout dla chronionych tras
│   │   └── user/
│   │       ├── profile/        # Profil użytkownika
│   │       ├── changepassword/ # Zmiana hasła
│   │       └── signout/        # Wylogowanie
│   ├── about/                   # Strona o aplikacji
│   ├── quiz/                    # Demonstracja komponentów quizowych
│   ├── layout.js               # Główny layout
│   ├── page.js                 # Strona główna
│   └── globals.css             # Style globalne
├── components/
│   ├── quiz/
│   │   ├── SingleChoiceQuestion.js
│   │   ├── MultipleChoiceQuestion.js
│   │   ├── FillInBlanksQuestion.js
│   │   └── MatchPairsQuestion.js
│   ├── Navbar.js               # Nawigacja
│   └── Footer.js               # Stopka
├── lib/
│   ├── firebase.js             # Konfiguracja Firebase
│   └── auth-context.js         # Context uwierzytelniania
├── middleware.js               # Middleware do ochrony tras
└── .env.local                  # Zmienne środowiskowe (do uzupełnienia)
```

## ⚙️ Instalacja i uruchomienie

### 1. Instalacja zależności

```bash
cd frontend-laboratory-app
npm install firebase
```

### 2. Konfiguracja Firebase

1. Utwórz projekt w [Firebase Console](https://console.firebase.google.com/)
2. Włącz **Authentication** → Email/Password
3. Utwórz bazę danych **Firestore**
4. W Project Settings → Your apps → dodaj aplikację Web
5. Skopiuj konfigurację Firebase

### 3. Zmienne środowiskowe

Uzupełnij plik `.env.local` danymi z Firebase:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Uruchomienie aplikacji

```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem: [http://localhost:3000](http://localhost:3000)

## 🎯 Funkcjonalności

### Publiczne strony:

- **/** - Strona główna z informacjami o aplikacji
- **/about** - O aplikacji i autorze
- **/user/signin** - Logowanie
- **/user/register** - Rejestracja

### Chronione strony (wymagane logowanie):

- **/quiz** - Demonstracja wszystkich typów pytań quizowych
- **/user/profile** - Profil użytkownika
- **/user/changepassword** - Zmiana hasła

## 📱 Responsywność

Aplikacja jest w pełni responsywna i dostosowana do trzech głównych rozmiarów ekranu:

- **Mobile** (< 768px)
- **Tablet** (768px - 1024px)
- **Desktop** (> 1024px)

## 🎨 Komponenty quizowe

Każdy komponent quizowy posiada:

- Tytuł pytania
- Treść z obsługą HTML
- Interaktywną część użytkownika
- Walidację odpowiedzi
- Feedback wizualny (poprawna/niepoprawna)
- Przycisk zatwierdzenia i ponownej próby
- Zapis wyniku do Firestore (dla zalogowanych użytkowników)

## 🔒 Bezpieczeństwo

- Uwierzytelnianie przez Firebase Authentication
- Ochrona tras za pomocą middleware
- Walidacja po stronie klienta i serwera
- Bezpieczne przechowywanie danych w Firestore

## 👨‍💻 Autor

**Jakub Kowalski**  
Student Informatyki  
Projekt zaliczeniowy - Frontend Laboratory

## 📄 Licencja

Projekt edukacyjny - Frontend Laboratory 2025

---

## 🛠️ Polecenia deweloperskie

```bash
# Uruchomienie w trybie deweloperskim
npm run dev

# Build produkcyjny
npm run build

# Start produkcyjny
npm start

# Linting
npm run lint
```

## 📚 Dokumentacja techniczna

### Biblioteka komponentów

Wykorzystano komponenty z [Tailblocks](https://tailblocks.cc/) - darmowa biblioteka komponentów Tailwind CSS.

### Firebase Rules (zalecane)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /quiz-results/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```
